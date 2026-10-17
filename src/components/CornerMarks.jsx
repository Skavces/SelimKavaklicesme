// Harita paftası köşe işaretleri (+) ve isteğe bağlı kenar etiketi.
// Üst kartın `.sheet` olması ve `overflow-hidden` taşımaması gerekir.
const corners = [
  "-top-[4.5px] -left-[4.5px]",
  "-top-[4.5px] -right-[4.5px]",
  "-bottom-[4.5px] -left-[4.5px]",
  "-bottom-[4.5px] -right-[4.5px]",
];

export default function CornerMarks({ label }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {corners.map((pos) => (
        <span key={pos} className={`absolute block size-[9px] ${pos}`}>
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-brand-800/40" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-brand-800/40" />
        </span>
      ))}
      {label && (
        <span className="absolute -top-[7px] left-6 bg-white px-2 font-mono text-[10px] uppercase leading-[14px] tracking-[0.14em] text-brand-500">
          {label}
        </span>
      )}
    </div>
  );
}
