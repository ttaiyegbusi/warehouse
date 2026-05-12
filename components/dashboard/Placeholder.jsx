export default function Placeholder({ title }) {
  return (
    <div className="px-10 py-8">
      <div className="text-sm font-sans text-neutral-500">/ {title}</div>
      <h2 className="font-sans text-3xl mt-2">{title}</h2>
      <p className="text-neutral-500 mt-2 font-sans text-sm">Coming soon.</p>
    </div>
  );
}
