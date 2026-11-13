interface NotFoundPageProps {
  onNavigateHome: () => void;
  onNavigateShop: () => void;
}

export function NotFoundPage({
  onNavigateHome,
  onNavigateShop,
}: NotFoundPageProps) {
  return (
    <div className="bg-[#F7F3ED] min-h-[70vh] flex items-center justify-center px-5 py-20 text-center">
      <div className="max-w-lg">
        <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#574638] mb-3">
          404 · PAGE NOT FOUND
        </p>
        <h1 className="font-editorial text-[42px] sm:text-[52px] leading-tight text-[#171614] mb-4">
          This Space Could Not Be Located.
        </h1>
        <p className="text-[15px] leading-[1.65] text-[#4C453E] mb-8">
          The page or piece you are looking for may have moved. Explore our
          signature furniture collection or return to the main editorial gallery.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={onNavigateShop}
            className="px-6 py-3.5 bg-[#292521] text-[#F7F3ED] text-[13px] font-medium rounded-[3px] hover:bg-[#171614] transition-colors cursor-pointer"
          >
            Browse All Products
          </button>
          <button
            type="button"
            onClick={onNavigateHome}
            className="px-6 py-3.5 border border-[#C9B8A5] text-[#292521] text-[13px] font-medium rounded-[3px] hover:bg-[#F1EBE3] transition-colors cursor-pointer"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
