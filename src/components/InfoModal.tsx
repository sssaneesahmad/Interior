import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { INFO_MODAL_CONTENT } from '../data/catalog';
import type { InfoModalTopic } from '../types';

interface InfoModalProps {
  topic: InfoModalTopic;
  onClose: () => void;
}

export function InfoModal({ topic, onClose }: InfoModalProps) {
  const [analyticsCookies, setAnalyticsCookies] = useState(true);
  const [preferenceCookies, setPreferenceCookies] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('atelier_sorel_cookies');
      if (raw) {
        const parsed = JSON.parse(raw) as { analytics?: boolean; preferences?: boolean };
        if (typeof parsed.analytics === 'boolean') setAnalyticsCookies(parsed.analytics);
        if (typeof parsed.preferences === 'boolean') setPreferenceCookies(parsed.preferences);
      }
    } catch {
      // Ignore storage access errors
    }
  }, [topic]);

  useEffect(() => {
    if (!topic) return;
    setSavedNotice(false);
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
  }, [topic, onClose]);

  if (!topic) return null;

  const handleSaveCookies = () => {
    try {
      localStorage.setItem(
        'atelier_sorel_cookies',
        JSON.stringify({
          essential: true,
          analytics: analyticsCookies,
          preferences: preferenceCookies,
        }),
      );
    } catch {
      // Ignore storage errors
    }
    setSavedNotice(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={topic === 'cookies' ? 'Cookie Preferences' : INFO_MODAL_CONTENT[topic].title}
    >
      <div
        className="absolute inset-0 bg-[#171614]/55 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-[640px] max-h-[88vh] overflow-y-auto bg-[#F7F3ED] border border-[#E6DDD1] shadow-2xl p-6 sm:p-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-10 h-10 inline-flex items-center justify-center text-[#292521] hover:text-[#171614] cursor-pointer"
        >
          <X className="w-5 h-5" strokeWidth={1.6} aria-hidden="true" />
        </button>

        {topic === 'cookies' ? (
          <div>
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#574638] mb-2">
              PRIVACY CONTROLS
            </p>
            <h2 className="font-editorial text-[34px] leading-tight text-[#171614] mb-3">
              Cookie Preferences
            </h2>
            <p className="text-[14.5px] leading-[1.65] text-[#4C453E] mb-6">
              Manage how Atelier Sorel stores local preferences in your browser.
            </p>

            <div className="space-y-4 border-y border-[#E6DDD1] py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[14px] font-medium text-[#171614]">
                    Strictly Necessary Storage
                  </p>
                  <p className="text-[13px] text-[#625B54] mt-0.5">
                    Preserves your shopping bag and saved wishlist locally.
                  </p>
                </div>
                <span className="text-[12px] font-medium text-[#574638] shrink-0">
                  Always Active
                </span>
              </div>

              <label className="flex items-start justify-between gap-4 cursor-pointer">
                <div>
                  <span className="block text-[14px] font-medium text-[#171614]">
                    Personalization & Room Filters
                  </span>
                  <span className="block text-[13px] text-[#625B54] mt-0.5">
                    Remembers recently explored spaces and finish preferences.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={preferenceCookies}
                  onChange={(e) => setPreferenceCookies(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[#292521] cursor-pointer"
                />
              </label>

              <label className="flex items-start justify-between gap-4 cursor-pointer">
                <div>
                  <span className="block text-[14px] font-medium text-[#171614]">
                    Aggregated Performance Insights
                  </span>
                  <span className="block text-[13px] text-[#625B54] mt-0.5">
                    Helps improve collection navigation speed and layout clarity.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsCookies}
                  onChange={(e) => setAnalyticsCookies(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[#292521] cursor-pointer"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              {savedNotice ? (
                <p role="status" className="text-[13px] text-[#574638] inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Preferences saved locally.</span>
                </p>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={handleSaveCookies}
                className="px-6 py-3 bg-[#292521] text-[#F7F3ED] text-[12.5px] font-medium tracking-[0.04em] rounded-[3px] hover:bg-[#171614] transition-colors cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#574638] mb-2">
              {INFO_MODAL_CONTENT[topic].eyebrow}
            </p>
            <h2 className="font-editorial text-[34px] sm:text-[38px] leading-tight text-[#171614] pb-5 border-b border-[#E6DDD1]">
              {INFO_MODAL_CONTENT[topic].title}
            </h2>
            <div className="mt-6 space-y-6">
              {INFO_MODAL_CONTENT[topic].sections.map((sec) => (
                <section key={sec.heading}>
                  <h3 className="font-editorial text-[23px] text-[#171614] mb-1.5">
                    {sec.heading}
                  </h3>
                  <p className="text-[14.5px] leading-[1.7] text-[#4C453E]">
                    {sec.body}
                  </p>
                </section>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
