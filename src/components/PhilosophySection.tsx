import { ArrowRight } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { ImageWithFallback } from './ImageWithFallback';

interface PhilosophySectionProps {
  onOpenApproach: () => void;
}

export function PhilosophySection({ onOpenApproach }: PhilosophySectionProps) {
  return (
    <section
      id="philosophy"
      className="py-16 sm:py-20 lg:py-24 bg-[#F7F3ED]"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Editorial Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#574638] mb-4">
                A MORE CONSIDERED HOME
              </p>
              <h2 className="font-editorial text-[36px] sm:text-[44px] lg:text-[50px] leading-[1.08] font-normal text-[#171614] mb-6">
                Designed for Living. Created to Last.
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#4C453E] max-w-[46ch] mb-8">
                We believe the spaces around us shape the way we feel. Our
                thoughtfully selected furniture and interior solutions combine
                comfort, craftsmanship, and timeless design to make everyday
                living more meaningful.
              </p>
              <button
                type="button"
                onClick={onOpenApproach}
                className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.06em] uppercase text-[#292521] hover:text-[#574638] transition-colors cursor-pointer py-2"
              >
                <span className="border-b border-[#292521]/40 group-hover:border-[#574638] pb-0.5 transition-colors">
                  Discover Our Approach
                </span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </button>
            </div>

            <div className="mt-10 pt-8 border-t border-[#E6DDD1] grid grid-cols-2 gap-6">
              <div>
                <p className="font-editorial text-2xl text-[#292521]">FSC Walnut</p>
                <p className="text-[13px] text-[#625B54] mt-1">
                  Hand-rubbed plant oil finishes
                </p>
              </div>
              <div>
                <p className="font-editorial text-2xl text-[#292521]">Belgian Flax</p>
                <p className="text-[13px] text-[#625B54] mt-1">
                  Breathable unbleached weaves
                </p>
              </div>
            </div>
          </div>

          {/* Right Architectural Dining + Two Stacked Material Cards */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="overflow-hidden bg-[#E6DDD1] aspect-[16/10] sm:aspect-[16/9]">
              <ImageWithFallback
                src={ASSETS.introDiningArchitecture}
                alt="Architectural dining room with solid walnut table, woven oak chairs, and tall sunlit garden windows"
                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <article className="bg-[#F1EBE3] border border-[#E6DDD1] p-4 flex items-center gap-4">
                <div className="w-24 h-24 shrink-0 overflow-hidden bg-[#E6DDD1]">
                  <ImageWithFallback
                    src={ASSETS.detailWalnutCraft}
                    alt="Close-up of solid American walnut dovetail joinery and chamfered edge"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-editorial text-[22px] leading-snug text-[#171614]">
                    Crafted with Purpose
                  </h3>
                  <p className="text-[13px] leading-[1.55] text-[#4C453E] mt-1">
                    Natural materials. Exceptional details. Lasting quality.
                  </p>
                </div>
              </article>

              <article className="bg-[#F1EBE3] border border-[#E6DDD1] p-4 flex items-center gap-4">
                <div className="w-24 h-24 shrink-0 overflow-hidden bg-[#E6DDD1]">
                  <ImageWithFallback
                    src={ASSETS.detailLinenUpholstery}
                    alt="Close-up of cream boucle and Belgian linen upholstery beside raw travertine"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-editorial text-[22px] leading-snug text-[#171614]">
                    Made for Real Life
                  </h3>
                  <p className="text-[13px] leading-[1.55] text-[#4C453E] mt-1">
                    Beautiful spaces designed around everyday comfort.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
