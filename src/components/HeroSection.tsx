import { useEffect, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { HERO_SLIDES } from '../data/catalog';
import type { ProductCategory } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroSectionProps {
  onExploreCollections: (category?: ProductCategory) => void;
  onOpenPhilosophy: () => void;
}

export function HeroSection({
  onExploreCollections,
  onOpenPhilosophy,
}: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = HERO_SLIDES[activeIndex];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="top"
      aria-label="Featured Architectural Spaces"
      className="relative w-full min-h-[500px] sm:min-h-[540px] lg:h-[580px] xl:h-[600px] overflow-hidden bg-[#292521]"
    >
      {/* Background slides */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          aria-hidden={idx !== activeIndex}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            idx === activeIndex ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'
          }`}
        >
          <ImageWithFallback
            src={slide.image}
            alt={slide.alt}
            priority={idx === 0}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Measured contrast scrim for WCAG AA legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-gradient-to-r from-[#171614]/82 via-[#171614]/48 to-[#171614]/15"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-28 z-10 bg-gradient-to-t from-[#171614]/60 to-transparent"
      />

      {/* Foreground Content */}
      <div className="relative z-20 max-w-[1380px] mx-auto h-full min-h-[500px] sm:min-h-[540px] lg:min-h-[580px] px-5 sm:px-8 lg:px-12 py-12 sm:py-16 flex flex-col justify-between">
        <div className="my-auto max-w-[600px]">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#E6DDD1] mb-4">
            {activeSlide.eyebrow}
          </p>

          <h1 className="font-editorial text-[40px] sm:text-[54px] lg:text-[66px] leading-[1.04] font-normal tracking-[-0.015em] text-[#FFFFFF] mb-5">
            {activeSlide.headline}
          </h1>

          <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#F1EBE3]/92 max-w-[490px] mb-8">
            {activeSlide.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-5">
            <button
              type="button"
              onClick={() => onExploreCollections(activeSlide.targetCategory)}
              className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#171614] text-[#F7F3ED] text-[13px] font-medium tracking-[0.04em] rounded-[3px] border border-[#F7F3ED]/20 hover:bg-[#F7F3ED] hover:text-[#171614] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Explore Collections</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={onOpenPhilosophy}
              className="group inline-flex items-center justify-center sm:justify-start gap-2.5 px-4 py-3 text-[13px] font-medium tracking-[0.04em] text-[#F7F3ED] hover:text-[#E6DDD1] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span className="w-8 h-8 rounded-full border border-[#F7F3ED]/55 inline-flex items-center justify-center group-hover:border-[#F7F3ED] transition-colors">
                <Play className="w-3 h-3 fill-current ml-0.5" aria-hidden="true" />
              </span>
              <span>Our Philosophy</span>
            </button>
          </div>
        </div>

        {/* Slide Indicators & Editorial Tagline */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6">
          <div className="flex items-center gap-4" role="tablist" aria-label="Hero slides">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`View slide ${idx + 1}: ${slide.headline}`}
                  onClick={() => setActiveIndex(idx)}
                  className="group py-2 flex items-center gap-2 cursor-pointer"
                >
                  <span
                    className={`block h-[2px] transition-all duration-300 ${
                      isActive
                        ? 'w-10 bg-[#F7F3ED]'
                        : 'w-5 bg-[#F7F3ED]/40 group-hover:bg-[#F7F3ED]/75'
                    }`}
                  />
                  <span
                    className={`text-[11px] tabular-nums tracking-wider ${
                      isActive ? 'text-[#F7F3ED]' : 'text-[#F7F3ED]/60'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-[11px] tracking-[0.14em] uppercase text-[#E6DDD1]/90">
            {activeSlide.tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
