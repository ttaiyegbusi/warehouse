export default function GhostCard({ children }) {
  return (
    <div className="relative">
      <div className="absolute top-0 left-12 opacity-20 select-none pointer-events-none">{children}</div>
      <div className="absolute top-0 left-6 opacity-50 select-none pointer-events-none">{children}</div>
      <div className="relative bg-white border border-neutral-200 p-5 w-80 shadow-sm">{children}</div>
    </div>
  );
}
