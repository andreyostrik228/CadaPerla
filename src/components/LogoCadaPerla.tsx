import { useId } from "react";

type Props = {
  /** Color del cuerpo de la granada */
  variante?: "granate" | "blanco";
  /** Tamaño del símbolo en píxeles */
  size?: number;
  className?: string;
};

export function SimboloCadaPerla({ variante = "granate", size = 32, className }: Props) {
  const maskId = useId();
  const fill = variante === "blanco" ? "#FFFFFF" : "#7E2438";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label="Cada Perla"
      className={className}
    >
      <title>Cada Perla</title>
      <mask id={maskId}>
        <rect width="64" height="64" fill="#000" />
        <path d="M26.5 19 V6.5 L29.5 10.2 L32 3.5 L34.5 10.2 L37.5 6.5 V19 Z" fill="#fff" />
        <circle cx="32" cy="39" r="21.5" fill="#fff" />
        <circle cx="23.2" cy="30.8" r="4.6" fill="#000" />
        <circle cx="40.8" cy="30.8" r="4.6" fill="#000" />
        <circle cx="23.2" cy="47.2" r="4.6" fill="#000" />
        <circle cx="40.8" cy="47.2" r="4.6" fill="#000" />
        <circle cx="32" cy="39" r="5.8" fill="#000" />
      </mask>
      <rect width="64" height="64" fill={fill} mask={`url(#${maskId})`} />
      <circle cx="32" cy="39" r="5.8" fill="#E9A13B" />
    </svg>
  );
}

export function LogoCadaPerla({
  variante = "granate",
  size = 32,
  textClassName,
}: Props & { textClassName?: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <SimboloCadaPerla variante={variante} size={size} />
      <span
        className={
          textClassName ??
          (variante === "blanco"
            ? "font-display text-xl font-bold text-white"
            : "font-display text-xl font-bold text-primary")
        }
      >
        Cada Perla
      </span>
    </span>
  );
}
