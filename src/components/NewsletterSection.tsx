import { useState, type FormEvent } from 'react';
import { Check } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

    if (!isValid) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section
      aria-label="Newsletter"
      className="py-16 sm:py-20 bg-[#F1EBE3] border-t border-[#E6DDD1]"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-[640px] mx-auto text-center">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#574638] mb-3">
            SEASONAL DISPATCH
          </p>
          <h2 className="font-editorial text-[34px] sm:text-[42px] leading-[1.1] font-normal text-[#171614] mb-3">
            A Little Inspiration, Delivered.
          </h2>
          <p className="text-[15px] leading-[1.65] text-[#4C453E] mb-8">
            Join our community for new collections, design inspiration, and
            thoughtful ideas for your home.
          </p>

          {subscribed ? (
            <div
              role="status"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#F7F3ED] border border-[#C9B8A5] text-[#292521] text-[14px]"
            >
              <Check className="w-4 h-4 text-[#574638]" strokeWidth={2} aria-hidden="true" />
              <span>Thank you. Your preference has been saved for upcoming dispatches.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="max-w-[480px] mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email address"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'newsletter-error' : undefined}
                  className="flex-1 px-4 py-3.5 bg-[#F7F3ED] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] placeholder:text-[#625B54] focus:border-[#292521] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 bg-[#292521] text-[#F7F3ED] text-[13px] font-medium tracking-[0.05em] uppercase rounded-[3px] hover:bg-[#171614] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </div>
              {error && (
                <p
                  id="newsletter-error"
                  role="alert"
                  className="text-[12.5px] text-[#7A3528] mt-2.5 text-left"
                >
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
