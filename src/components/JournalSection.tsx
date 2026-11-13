import { ArrowRight } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/catalog';
import type { JournalArticle } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface JournalSectionProps {
  onReadArticle: (article: JournalArticle) => void;
}

export function JournalSection({ onReadArticle }: JournalSectionProps) {
  return (
    <section
      id="journal"
      className="py-16 sm:py-20 lg:py-24 bg-[#F7F3ED]"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-[560px] mb-10 sm:mb-12">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#574638] mb-3">
            THE ATELIER JOURNAL
          </p>
          <h2 className="font-editorial text-[36px] sm:text-[44px] lg:text-[48px] leading-[1.08] font-normal text-[#171614]">
            Stories for Inspired Living
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
          {JOURNAL_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col bg-[#F7F3ED] border border-[#E6DDD1] hover:border-[#C9B8A5] transition-colors duration-300"
            >
              <button
                type="button"
                onClick={() => onReadArticle(article)}
                className="w-full aspect-[4/3] overflow-hidden bg-[#E6DDD1] block cursor-pointer"
                aria-label={`Read article: ${article.title}`}
              >
                <ImageWithFallback
                  src={article.image}
                  alt={article.alt}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </button>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 text-[11.5px] tracking-[0.06em] uppercase text-[#625B54] mb-3">
                    <span>{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readingTime}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onReadArticle(article)}
                    className="text-left block cursor-pointer"
                  >
                    <h3 className="font-editorial text-[26px] leading-[1.18] text-[#171614] group-hover:text-[#574638] transition-colors mb-3">
                      {article.title}
                    </h3>
                  </button>

                  <p className="text-[14px] leading-[1.65] text-[#4C453E]">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E6DDD1]">
                  <button
                    type="button"
                    onClick={() => onReadArticle(article)}
                    className="group/btn inline-flex items-center gap-2 text-[12.5px] font-medium tracking-[0.06em] uppercase text-[#292521] hover:text-[#574638] transition-colors cursor-pointer py-1"
                  >
                    <span>Read Story</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
