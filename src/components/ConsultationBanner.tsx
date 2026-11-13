import { ArrowRight } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { ImageWithFallback } from './ImageWithFallback';

interface ConsultationBannerProps {
  onOpenConsultation: () => void;
}

export function ConsultationBanner({
  onOpenConsultation,
}: ConsultationBannerProps) {
  return (
    <section
      aria-label="Design Consultation"
      className="relative w-full min-h-[380px] sm:min-h-[430px] overflow-hidden bg-[#292521]"
    >
      <ImageWithFallback
        src={ASSETS.consultationBanner}
        alt="Atelier Sorel interior design consultation lounge with walnut paneling and travertine material sample table"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#171614]/84 via-[#171614]/58 to-[#171614]/35"
      />

      <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24 flex items-center min-h-[380px] sm:min-h-[430px]">
        <div className="max-w-[560px]">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#E6DDD1] mb-4">
            BESPOKE INTERIOR ADVISORY
          </p>
          <h2 className="font-editorial text-[36px] sm:text-[46px] lg:text-[52px] leading-[1.08] font-normal text-[#FFFFFF] mb-4">
            Your Space, Thoughtfully Considered.
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#F1EBE3]/92 mb-8">
            Work with our design team to bring your vision to life with
            carefully considered furniture and interior solutions.
          </p>
          <button
            type="button"
            onClick={onOpenConsultation}
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#F7F3ED] text-[#171614] text-[13px] font-medium tracking-[0.04em] rounded-[3px] hover:bg-[#FFFFFF] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Book Your Consultation</span>
            <ArrowRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
