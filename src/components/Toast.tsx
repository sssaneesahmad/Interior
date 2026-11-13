import { Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onOpenBag?: () => void;
}

export function Toast({ message, onOpenBag }: ToastProps) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 max-w-sm bg-[#171614] text-[#F7F3ED] px-4 py-3.5 shadow-xl border border-[#F7F3ED]/15 rounded-[3px] flex items-center gap-3 animate-fade-up"
    >
      <Check className="w-4 h-4 text-[#C9B8A5] shrink-0" strokeWidth={2} aria-hidden="true" />
      <span className="text-[13px] leading-snug">{message}</span>
      {onOpenBag && (
        <button
          type="button"
          onClick={onOpenBag}
          className="ml-1 text-[12px] font-medium tracking-[0.04em] uppercase text-[#C9B8A5] hover:text-[#FFFFFF] underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
        >
          View Bag
        </button>
      )}
    </div>
  );
}
