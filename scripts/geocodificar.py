"""
Genera src/data/ubicaciones.ts: coordenadas y barrio de cada ficha con
dirección, sacados de OpenStreetMap (Nominatim).

Uso:  python scripts/geocodificar.py
      npx prettier --write src/data/ubicaciones.ts   (el script lo escribe en una línea por ficha)

- Lee `id`, `direccion` y `codigoPostal` de src/data/recursos.ts con una
  expresión regular (por eso ese archivo mantiene un formato fijo).
- Respeta la política de uso de Nominatim: una petición por segundo como
  mucho y un User-Agent que identifica el proyecto.
- `exacta` es true solo si OpenStreetMap encuentra el número del portal. Si
  solo encuentra la calle, el punto va al centro de la calle y la ficha avisa
  de que la situación es aproximada.
- Las 4 fichas de la primera versión de la web conservan sus coordenadas,
  que ya se comprobaron a mano; de ellas solo se pide el barrio.
- Descarta cualquier resultado fuera de Granada capital y lo lista al final
  para revisarlo a mano: es mejor una ficha sin punto en el mapa que un punto
  en otra ciudad.
"""
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
RAIZ = Path(__file__).resolve().parent.parent
RECURSOS = RAIZ / "src" / "data" / "recursos.ts"
SALIDA = RAIZ / "src" / "data" / "ubicaciones.ts"
AGENTE = "CadaPerla/1.0 (proyecto escolar; https://andreyostrik228.github.io)"
# Caja que contiene Granada capital, con algo de margen.
LAT, LNG = (37.12, 37.24), (-3.68, -3.54)

FIJAS = {
    "san-juan-de-dios": (37.18097, -3.60306, True),
    "regina-mundi": (37.17355, -3.60821, False),
    "calor-y-cafe": (37.19458, -3.61131, True),
    "edicoma": (37.17888, -3.60249, False),
}


def leer_fichas():
    texto = RECURSOS.read_text(encoding="utf-8")
    fichas = []
    for bloque in re.split(r"\n  \{\n", texto)[1:]:
        m_id = re.search(r'^    id: "([^"]+)"', bloque, re.M)
        m_dir = re.search(r'^    direccion: (null|"([^"]*)")', bloque, re.M)
        if not m_id or not m_dir:
            continue
        m_cp = re.search(r'^    codigoPostal: "(\d{5})"', bloque, re.M)
        fichas.append((m_id.group(1), m_dir.group(2), m_cp.group(1) if m_cp else None))
    return fichas


def limpiar(direccion):
    """De la dirección que se enseña, lo que entiende un geocodificador: calle y número."""
    d = direccion.split(" — ")[0]
    d = re.sub(r"\([^)]*\)", "", d)
    d = d.replace("Complejo Los Mondragones, ", "").replace("Espacio V Centenario, ", "")
    partes = [p.strip() for p in d.split(",")]
    calle = partes[0]
    # "Plaza de la Ilusión, esquina C/ Julio Verne": la esquina no ayuda a buscar.
    calle = re.sub(r"\s+s/n$", "", calle)
    calle = re.sub(r"\s+(\d+)[A-Z]?$", r" \1", calle)
    for corto, largo in [("C/ ", "Calle "), ("Av. ", "Avenida "), ("Ctra. ", "Carretera ")]:
        if calle.startswith(corto):
            calle = largo + calle[len(corto):]
    calle = calle.replace("Calle Camino de Ronda", "Camino de Ronda")
    numero = re.search(r"\s(\d+)$", calle)
    return calle, numero.group(1) if numero else None


def pedir(url):
    req = urllib.request.Request(url, headers={"User-Agent": AGENTE, "Accept-Language": "es"})
    with urllib.request.urlopen(req, timeout=30) as r:
        datos = json.load(r)
    time.sleep(1.1)
    return datos


# Solo para buscar: la ficha sigue enseñando la dirección tal como la da la fuente.
CORRECCIONES = {"Márquez de Mondéjar": "Marqués de Mondéjar", "Avenida Cervantes": "Avenida de Cervantes"}
# La Carretera Antigua de Málaga no está en OpenStreetMap dentro de Granada
# capital; la propia dirección dice que la entrada es por C/ Higuera.
BUSCAR_COMO = {"medicos-del-mundo": "Calle Higuera"}


def buscar(calle, cp):
    for mal, bien in CORRECCIONES.items():
        calle = calle.replace(mal, bien)
    # Primero con la ciudad como campo aparte: con texto libre, Nominatim
    # mandaba "Avenida Cervantes 29" a Escúzar y "Margarita Xirgu" a Guadix.
    numero = re.search(r"\s(\d+)$", calle)
    nombre = re.sub(r"\s\d+$", "", calle)
    estructurada = {"street": f"{numero.group(1)} {nombre}" if numero else nombre, "city": "Granada", "country": "España"}
    if cp:
        estructurada["postalcode"] = cp
    libre = {"q": f"{calle}, {cp + ' ' if cp else ''}Granada, España"}
    for params in (estructurada, libre):
        params.update({"format": "jsonv2", "addressdetails": 1, "limit": 5, "countrycodes": "es"})
        res = pedir("https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode(params))
        # "city=Granada" no filtra de verdad: puede devolver antes la misma
        # calle en Guadix o Maracena. Se coge la primera que está en Granada.
        buenos = [r for r in res if en_granada(float(r["lat"]), float(r["lon"]), r)]
        if buenos:
            return buenos[0]
        if res and params is libre:
            return res[0]  # fuera de Granada: main() lo rechaza y lo lista para revisar
    return None


def inverso(lat, lng):
    url = "https://nominatim.openstreetmap.org/reverse?" + urllib.parse.urlencode(
        {"lat": lat, "lon": lng, "format": "jsonv2", "addressdetails": 1, "zoom": 18}
    )
    return pedir(url)


def barrio_y_distrito(direccion):
    a = direccion.get("address", {})
    barrio = a.get("suburb") or a.get("neighbourhood") or a.get("quarter")
    return barrio, a.get("city_district")


def en_granada(lat, lng, res):
    ciudad = res.get("address", {}).get("city")
    return LAT[0] < lat < LAT[1] and LNG[0] < lng < LNG[1] and ciudad == "Granada"


def main():
    ubicaciones, revisar = {}, []
    fichas = leer_fichas()
    print(f"{len(fichas)} fichas, {sum(1 for f in fichas if f[1])} con dirección")
    for id_, direccion, cp in fichas:
        if not direccion:
            continue
        if id_ in FIJAS:
            lat, lng, exacta = FIJAS[id_]
            barrio, distrito = barrio_y_distrito(inverso(lat, lng))
            ubicaciones[id_] = dict(lat=lat, lng=lng, exacta=exacta, barrio=barrio, distrito=distrito)
            print(f"  fija   {id_:32} {barrio} / {distrito}")
            continue
        calle, numero = limpiar(direccion)
        if id_ in BUSCAR_COMO:
            calle, numero = BUSCAR_COMO[id_], None
        res = buscar(calle, cp)
        if res is None and numero:
            res = buscar(re.sub(r"\s\d+$", "", calle), cp)
        if res is None:
            revisar.append((id_, direccion, "OpenStreetMap no la encuentra"))
            print(f"  NADA   {id_:32} {calle}")
            continue
        lat, lng = float(res["lat"]), float(res["lon"])
        if not en_granada(lat, lng, res):
            revisar.append((id_, direccion, f"sale fuera de Granada capital: {res.get('display_name')}"))
            print(f"  FUERA  {id_:32} {res.get('display_name')}")
            continue
        portal = res.get("address", {}).get("house_number")
        exacta = bool(numero and portal and portal.split(",")[0].strip() == numero)
        barrio, distrito = barrio_y_distrito(res)
        ubicaciones[id_] = dict(lat=round(lat, 5), lng=round(lng, 5), exacta=exacta, barrio=barrio, distrito=distrito)
        print(f"  {'exacta' if exacta else 'calle '} {id_:32} {calle} -> {barrio} / {distrito}")

    lineas = [
        "/**",
        " * GENERADO por scripts/geocodificar.py a partir de OpenStreetMap (Nominatim).",
        " * No editar a mano: se vuelve a generar si cambia una dirección en recursos.ts.",
        " *",
        " * `exacta`: OpenStreetMap encontró el número del portal. Si es false, el punto",
        " * está en la calle, no en el portal, y la ficha lo avisa.",
        " * `barrio` y `distrito`: los de OpenStreetMap, para el buscador y el filtro.",
        " * Las fichas que no están aquí no tienen dirección o no se pudieron situar.",
        " */",
        "export type Ubicacion = {",
        "  lat: number;",
        "  lng: number;",
        "  exacta: boolean;",
        "  barrio: string | null;",
        "  distrito: string | null;",
        "};",
        "",
        "export const UBICACIONES: Record<string, Ubicacion> = {",
    ]
    for id_, u in ubicaciones.items():
        lineas.append(f'  "{id_}": {json.dumps(u, ensure_ascii=False)},')
    lineas += ["};", ""]
    SALIDA.write_text("\n".join(lineas), encoding="utf-8", newline="\n")
    print(f"\n{len(ubicaciones)} situadas ({sum(u['exacta'] for u in ubicaciones.values())} exactas) -> {SALIDA.relative_to(RAIZ)}")
    if revisar:
        print("\nPara revisar a mano:")
        for r in revisar:
            print("  -", *r)


if __name__ == "__main__":
    main()
