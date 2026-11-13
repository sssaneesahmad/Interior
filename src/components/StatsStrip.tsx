import { Compass, Globe, HeartHandshake, Sparkles } from 'lucide-react';
import { BRAND_STATS } from '../data/catalog';

const STAT_ICONS = [Compass, Globe, HeartHandshake, Sparkles];

export function StatsStrip() {
  return (
    <section
      aria-label="Brand Heritage and Scale"
      className="py-6 sm:py-8 bg-[#F7F3ED]"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="bg-[#E6DDD1] rounded-[4px] border border-[#C9B8A5]/50 py-8 sm:py-10 px-6 sm:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 lg:gap-0 lg:divide-x lg:divide-[#A39483]/45">
            {BRAND_STATS.map((stat, index) => {
              const Icon = STAT_ICONS[index];
              return (
                <div
                  key={stat.id}
                  className="flex flex-col items-center text-center lg:px-6"
                >
                  <Icon
                    className="w-[18px] h-[18px] text-[#574638] mb-3"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <p className="font-editorial text-[36px] sm:text-[42px] leading-none text-[#171614] tabular-nums">
                    {stat.value}
                  </p>
                  <p className="text-[12.5px] tracking-[0.04em] text-[#4C453E] mt-2">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
