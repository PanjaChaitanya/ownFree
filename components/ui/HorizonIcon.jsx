/**
 * Horizon Web Labs logo mark.
 *
 * The H letterform's crossbar is replaced by a rising arc —
 * simultaneously the letter H and a sunrise on the horizon.
 *
 * Renders white paths on a transparent background so the
 * parent container controls the background colour and shape.
 */
export default function HorizonIcon({ size = 18, className = '' }) {
  // Scale all coordinates from the native 18×18 grid
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* H — left upright */}
      <line x1="3.5" y1="3" x2="3.5" y2="15" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      {/* H — right upright */}
      <line x1="14.5" y1="3" x2="14.5" y2="15" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      {/* H crossbar as rising arc — the "horizon sunrise"
          From left upright at y=10, peak ~y=4.5, to right upright at y=10 */}
      <path
        d="M3.5 10 Q9 2 14.5 10"
        stroke="white"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      {/* Sun at the arc apex (≈ y=5) */}
      <circle cx="9" cy="5.5" r="1.1" fill="white" />
      {/* Horizon baseline */}
      <line x1="1.5" y1="13" x2="16.5" y2="13" stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.4" />
    </svg>
  );
}
