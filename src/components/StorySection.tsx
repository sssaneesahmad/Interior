import { ArrowRight } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { STORY_VALUES } from '../data/catalog';
import { ImageWithFallback } from './ImageWithFallback';

interface StorySectionProps {
  onOpenStory: () => void;
}

export function StorySection({ onOpenStory }: StorySectionProps) {
  return (
    <section
      id="our-story"
      className="py-16 sm:py-20 lg:py-24 bg-[#F7F3ED]"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#F1EBE3] border border-[#E6DDD1] items-stretch">
          {/* Left Architectural Living Room Photograph (50% desktop) */}
          <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] lg:min-h-[540px] overflow-hidden bg-[#E6DDD1]">
            <ImageWithFallback
              src={ASSETS.storyAtelierInterior}
              alt="Sunlit architectural living room with floor-to-ceiling natural walnut shelving, cream linen sofa, honed limestone coffee table, and olive tree"
              className="w-full h-full lg:absolute lg:inset-0 object-cover"
            />
          </div>

          {/* Right Editorial Narrative + Brand Values */}
          <div className="lg:col-span-6 p-7 sm:p-10 lg:p-14 xl:p-16 bg-[#F7F3ED] flex flex-col justify-between">
            <div>
              <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#574638] mb-3">
                OUR STORY
              </p>
              <h2 className="font-editorial text-[34px] sm:text-[42px] lg:text-[46px] leading-[1.08] font-normal text-[#171614] mb-3">
                Thoughtful Spaces. Meaningful Living.
              </h2>
              <h3 className="font-editorial italic text-[22px] sm:text-[24px] leading-snug text-[#574638] mb-6">
                More Than Furniture. A Way of Living.
              </h3>

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                <div className="xl:col-span-7 space-y-4 text-[15px] leading-[1.7] text-[#4C453E]">
                  <p>
                    We believe great design should feel as good as it looks. Our
                    approach brings together timeless forms, considered
                    materials, and thoughtful craftsmanship to create spaces
                    that inspire everyday living.
                  </p>
                  <p>
                    From the first design idea to the finishing details, we
                    celebrate the beauty of simplicity and the character of
                    natural materials.
                  </p>
                </div>

                {/* Vertical Brand Values */}
                <div className="xl:col-span-5 xl:pl-6 xl:border-l border-[#E6DDD1]">
                  <p className="text-[10.5px] font-medium tracking-[0.16em] uppercase text-[#625B54] mb-3">
                    OUR PILLARS
                  </p>
                  <ul className="space-y-3">
                    {STORY_VALUES.map((item) => (
                      <li key={item.title} className="pb-2.5 border-b border-[#E6DDD1] last:border-b-0 last:pb-0">
                        <p className="font-editorial text-[20px] leading-tight text-[#171614]">
                          {item.title}
                        </p>
                        <p className="text-[12px] leading-[1.45] text-[#625B54] mt-0.5">
                          {item.detail}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E6DDD1]">
              <button
                type="button"
                onClick={onOpenStory}
                className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.06em] uppercase text-[#292521] hover:text-[#574638] transition-colors cursor-pointer py-1.5"
              >
                <span className="border-b border-[#292521]/40 group-hover:border-[#574638] pb-0.5">
                  Discover Our Story
                </span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
