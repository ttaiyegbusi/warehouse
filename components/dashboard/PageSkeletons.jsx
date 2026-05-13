import Skel from "./Skel";

/* -------------------------- Home Skeleton --------------------------- */
export function HomeSkeleton() {
  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8 w-full">
      <Skel w={140} h={14} />
      <Skel w={280} h={42} className="mt-3" />
      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border border-neutral-200 p-5">
            <Skel w={28} h={20} />
            <Skel w={50} h={12} className="mt-4" />
            <Skel w={140} h={26} className="mt-3" />
          </div>
        ))}
      </div>

      <div className="mt-10 lg:mt-12 flex items-center justify-between">
        <Skel w={150} h={12} />
        <Skel w={50} h={12} />
      </div>

      <div className="mt-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center px-2 py-4 border-b border-neutral-100">
            <Skel w={18} h={18} className="rounded-full" />
            <div className="flex-1 ml-4">
              <Skel w={120} h={12} />
              <Skel w={220} h={10} className="mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------- Transactions Skeleton ---------------------- */
export function TransactionsSkeleton() {
  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8 w-full">
      <Skel w={100} h={14} />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border border-neutral-200 p-5">
            <Skel w={100} h={26} />
            <Skel w={50} h={12} className="mt-3" />
            <Skel w={140} h={10} className="mt-2" />
          </div>
        ))}
      </div>

      <div className="mt-8 lg:mt-10">
        <Skel w={90} h={30} />
        <Skel w={180} h={36} className="mt-4" />
        <Skel w={240} h={12} className="mt-2" />
        <div className="mt-6">
          <Skel w="100%" h={320} />
        </div>
      </div>

      <div className="mt-10 lg:mt-12 flex items-center justify-between">
        <Skel w={150} h={12} />
        <Skel w={50} h={12} />
      </div>

      <div className="mt-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center px-2 py-4 border-b border-neutral-100">
            <Skel w={18} h={18} className="rounded-full" />
            <div className="flex-1 ml-4">
              <Skel w={120} h={12} />
              <Skel w={220} h={10} className="mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------- Wallet Skeleton ------------------------- */
export function WalletSkeleton() {
  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8 w-full">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <Skel w={140} h={14} />
          <Skel w={240} h={36} className="mt-3" />
          <Skel w={180} h={10} className="mt-2" />
        </div>
        <Skel w={160} h={36} />
      </div>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border border-neutral-200 px-4 py-4 flex items-center gap-3">
            <Skel w={32} h={32} />
            <Skel w={80} h={12} />
          </div>
        ))}
      </div>

      <div className="mt-12 flex items-center justify-between">
        <Skel w={100} h={12} />
        <Skel w={60} h={12} />
      </div>

      <div className="mt-4 flex gap-4 overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skel key={i} w={300} h={180} className="shrink-0" />
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        <div>
          <Skel w={120} h={12} />
          <div className="mt-4 border border-neutral-200">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center px-4 py-3 border-b border-neutral-100 last:border-b-0">
                <Skel w={36} h={36} />
                <div className="flex-1 ml-3">
                  <Skel w={100} h={12} />
                  <Skel w={140} h={10} className="mt-2" />
                </div>
                <Skel w={60} h={20} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <Skel w={120} h={12} />
          <div className="mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center px-2 py-3 border-b border-neutral-100">
                <Skel w={36} h={36} />
                <div className="flex-1 ml-3">
                  <Skel w={140} h={12} />
                  <Skel w={80} h={10} className="mt-2" />
                </div>
                <Skel w={70} h={12} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------- Inbox Skeleton ------------------------- */
export function InboxSkeleton() {
  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8 w-full">
      <div className="flex justify-end">
        <Skel w={90} h={14} />
      </div>
      {["Today", "Last 7 days", "September"].map((group) => (
        <div key={group} className="mt-6">
          <Skel w={80} h={14} />
          <div className="mt-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="grid grid-cols-[24px_220px_1fr_120px_80px] gap-4 items-center py-3 px-2 border-b border-neutral-100">
                <Skel w={14} h={14} />
                <Skel w={140} h={12} />
                <Skel w={260} h={12} />
                <Skel w={70} h={20} className="justify-self-end" />
                <Skel w={50} h={10} className="justify-self-end" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------- Calendar Skeleton ------------------------ */
export function CalendarSkeleton() {
  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8 w-full">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <Skel w={260} h={36} />
        <div className="flex items-center gap-3">
          <Skel w={160} h={32} />
          <Skel w={120} h={32} />
        </div>
      </div>

      <div className="mt-6 border border-neutral-200">
        <div className="grid grid-cols-7 border-b border-neutral-200">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="px-3 py-3 border-r border-neutral-200 last:border-r-0">
              <Skel w={26} h={10} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {Array.from({ length: 42 }).map((_, i) => {
            const isLastRow = i >= 35;
            const isLastCol = (i + 1) % 7 === 0;
            return (
              <div
                key={i}
                className={`h-24 sm:h-28 lg:h-32 p-2 sm:p-3 ${
                  !isLastRow ? "border-b border-neutral-200" : ""
                } ${!isLastCol ? "border-r border-neutral-200" : ""}`}
              >
                <Skel w={18} h={12} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* --------------------------- Docs Skeleton -------------------------- */
export function DocsSkeleton() {
  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 w-full">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
        <Skel w={80} h={14} />
        <div className="flex items-center gap-1">
          <Skel w={32} h={32} />
          <Skel w={32} h={32} />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border border-neutral-200 bg-white flex flex-col">
            <div className="flex items-start justify-between px-4 pt-3">
              <Skel w={40} h={12} />
              <Skel w={28} h={28} />
            </div>
            <div className="flex-1 min-h-[120px]" />
            <div className="px-4 pb-4 pt-3">
              <Skel w={120} h={14} />
              <Skel w={160} h={10} className="mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
