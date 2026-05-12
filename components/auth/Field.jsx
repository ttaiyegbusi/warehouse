export default function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-sans text-neutral-500 mb-2">{label}</label>
      {children}
    </div>
  );
}
