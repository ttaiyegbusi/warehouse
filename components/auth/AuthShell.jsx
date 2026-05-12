export default function AuthShell({ children, rightCard }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <aside className="md:w-64 md:shrink-0 bg-neutral-50 md:border-r border-b md:border-b-0 border-neutral-200 flex md:flex-col justify-between p-4 md:p-6 items-center md:items-stretch">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-black flex items-center justify-center">
            <span className="text-white font-sans font-bold text-lg leading-none">W</span>
          </div>
          <span className="font-sans text-lg">Warehouse</span>
        </div>
        <div className="hidden md:flex md:flex-col space-y-3 text-sm font-sans mt-auto">
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
      <main className="flex-1 flex items-start md:items-center justify-center px-4 sm:px-8 lg:px-12 py-8 md:py-16 relative">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>{children}</div>
          <div className="relative pt-4 lg:pt-16 flex justify-center lg:justify-start">
            {rightCard}
          </div>
        </div>
      </main>
    </div>
  );
}
