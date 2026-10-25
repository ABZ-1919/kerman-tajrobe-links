import { LOGO_COLORS, LOGO_PIECES, LOGO_VIEWBOX } from './logo-paths';

/** Static logo, used in the links page header and for reduced-motion users. */
export function StaticLogo({ className, withCircle = true }: { className?: string; withCircle?: boolean }) {
  const r = LOGO_VIEWBOX / 2;
  return (
    <svg viewBox={`0 0 ${LOGO_VIEWBOX} ${LOGO_VIEWBOX}`} className={className} role="img" aria-label="کرمان تجربه">
      {withCircle && <circle cx={r} cy={r} r={r} fill={LOGO_COLORS.circle} />}
      {LOGO_PIECES.map((p) => (
        <path
          key={p.id}
          d={p.d}
          fill={LOGO_COLORS.ink}
          fillRule="evenodd"
          stroke={LOGO_COLORS.outline}
          strokeWidth={8}
          strokeLinejoin="round"
          paintOrder="stroke"
        />
      ))}
    </svg>
  );
}
