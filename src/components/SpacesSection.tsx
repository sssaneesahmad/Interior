import { ArrowRight } from 'lucide-react';
import { SPACES } from '../data/catalog';
import type { ProductCategory } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface SpacesSectionProps {
  onSelectSpace: (category: ProductCategory) => void;
}

export function SpacesSection({ onSelectSpace }: SpacesSectionProps) {
  return (
    <section
      id="spaces"
      className="py-16 sm:py-20 lg:py-24 bg-[#F1EBE3]"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-[580px]">
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#574638] mb-3">
              EXPLORE BY SPACE
            </p>
            <h2 className="font-editorial text-[36px] sm:text-[44px] lg:text-[48px] leading-[1.08] font-normal text-[#171614] mb-3">
              Find Your Perfect Space
            </h2>
            <p className="text-[15px] leading-[1.65] text-[#4C453E]">
              From cozy corners to open living, discover thoughtfully selected
              furniture and design solutions for every room in your home.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectSpace('All')}
            className="group self-start md:self-auto inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.06em] uppercase text-[#292521] hover:text-[#574638] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-2"
          >
            <span className="border-b border-[#292521]/40 group-hover:border-[#574638] pb-0.5">
              View All Spaces
            </span>
            <ArrowRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Four-Column Space Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPACES.map((space) => (
            <button
              key={space.id}
              type="button"
              onClick={() => onSelectSpace(space.filterCategory)}
              className="group text-left bg-[#F7F3ED] border border-[#E6DDD1] hover:border-[#C9B8A5] transition-colors duration-300 flex flex-col overflow-hidden cursor-pointer"
            >
              <div className="w-full aspect-[4/3] overflow-hidden bg-[#E6DDD1]">
                <ImageWithFallback
                  src={space.image}
                  alt={space.alt}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              <div className="p-5 sm:p-6 flex items-center justify-between gap-4 bg-[#F7F3ED] group-hover:bg-[#FAF7F2] transition-colors duration-300 flex-1">
                <div>
                  <h3 className="font-editorial text-[24px] leading-snug text-[#171614]">
                    {space.title}
                  </h3>
                  <p className="text-[13px] text-[#574638] mt-1">
                    {space.subtitle}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="w-9 h-9 rounded-full border border-[#C9B8A5] inline-flex items-center justify-center shrink-0 text-[#292521] group-hover:bg-[#292521] group-hover:text-[#F7F3ED] group-hover:border-[#292521] transition-all duration-300"
                >
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.6} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
