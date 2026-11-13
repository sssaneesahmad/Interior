import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { JournalArticle } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface ArticleModalProps {
  article: JournalArticle | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export function ArticleModal({
  article,
  onClose,
  onOpenConsultation,
}: ArticleModalProps) {
  useEffect(() => {
    if (!article) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
    >
      <div
        className="absolute inset-0 bg-[#171614]/55 backdrop-blur-xs"
        onClick={onClose}
      />

      <article className="relative z-10 w-full max-w-[780px] max-h-[90vh] overflow-y-auto bg-[#F7F3ED] border border-[#E6DDD1] shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close article"
          className="absolute top-3.5 right-3.5 z-20 w-10 h-10 rounded-full bg-[#F7F3ED]/92 border border-[#E6DDD1] inline-flex items-center justify-center text-[#292521] hover:bg-[#FFFFFF] cursor-pointer"
        >
          <X className="w-5 h-5" strokeWidth={1.6} aria-hidden="true" />
        </button>

        <div className="aspect-[16/9] w-full bg-[#E6DDD1] overflow-hidden">
          <ImageWithFallback
            src={article.image}
            alt={article.alt}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 sm:p-10 lg:p-12">
          <div className="flex flex-wrap items-center gap-2 text-[11.5px] tracking-[0.08em] uppercase text-[#625B54] mb-3">
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedDate}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime}</span>
          </div>

          <h2 className="font-editorial text-[32px] sm:text-[42px] leading-[1.1] text-[#171614] mb-3">
            {article.title}
          </h2>
          <p className="text-[13px] text-[#574638] pb-6 border-b border-[#E6DDD1]">
            By {article.author}
          </p>

          <div className="mt-6 space-y-5 text-[15.5px] leading-[1.78] text-[#292521]">
            {article.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-[#E6DDD1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[13.5px] text-[#4C453E]">
              Interested in exploring these materials in your own home?
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="px-5 py-3 bg-[#292521] text-[#F7F3ED] text-[12.5px] font-medium tracking-[0.04em] rounded-[3px] hover:bg-[#171614] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book a Consultation
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
