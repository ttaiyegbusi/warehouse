export default function AuthShell({ children, rightCard }) {
  return (
    <div className="min-h-screen flex bg-white">
      <aside className="w-64 shrink-0 bg-neutral-50 border-r border-neutral-200 flex flex-col justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-black flex items-center justify-center">
            <span className="text-white font-sans font-bold text-lg leading-none">W</span>
          </div>
          <span className="font-sans text-lg">Warehouse</span>
        </div>
        <div className="space-y-3 text-sm font-sans">
          <div className="text-neutral-700">Support</div>
          <div className="text-neutral-700">Guides</div>
          <div className="flex items-center gap-2 border border-neutral-200 px-3 py-2 bg-white">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-medium">
              TA
            </div>
            <span className="text-sm">Temitope Aiyegbusi</span>
          </div>
        </div>
      </aside>
      <main className="flex-1 flex items-center justify-center px-12 py-16 relative">
        <div className="w-full max-w-5xl grid grid-cols-2 gap-16 items-start">
          <div>{children}</div>
          <div className="relative pt-16">{rightCard}</div>
        </div>
      </main>
    </div>
  );
}
