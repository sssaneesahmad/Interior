import { useEffect, useState, type FormEvent } from 'react';
import { Check, X } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consultationType, setConsultationType] = useState('Virtual Video Studio');
  const [roomType, setRoomType] = useState('Living Room');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!fullName.trim()) {
      nextErrors.fullName = 'Full name is required.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 7) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }
    if (!message.trim()) {
      nextErrors.message = 'Please share a brief note about your space or timeline.';
    }
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmittedRef(`CON-${Math.floor(10000 + Math.random() * 90000)}`);
  };

  const resetAndClose = () => {
    setSubmittedRef(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Book a Design Consultation"
    >
      <div
        className="absolute inset-0 bg-[#171614]/55 backdrop-blur-xs"
        onClick={resetAndClose}
      />

      <div className="relative z-10 w-full max-w-[620px] max-h-[90vh] overflow-y-auto bg-[#F7F3ED] border border-[#E6DDD1] shadow-2xl p-6 sm:p-10">
        <button
          type="button"
          onClick={resetAndClose}
          aria-label="Close consultation form"
          className="absolute top-4 right-4 w-10 h-10 inline-flex items-center justify-center text-[#292521] hover:text-[#171614] cursor-pointer"
        >
          <X className="w-5 h-5" strokeWidth={1.6} aria-hidden="true" />
        </button>

        {submittedRef ? (
          <div className="py-8 text-center space-y-5">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#E6DDD1] flex items-center justify-center text-[#574638]">
              <Check className="w-6 h-6" strokeWidth={1.8} aria-hidden="true" />
            </div>
            <div>
              <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#574638]">
                INQUIRY REFERENCE · {submittedRef}
              </p>
              <h2 className="font-editorial text-[34px] text-[#171614] mt-1">
                Consultation Request Prepared
              </h2>
              <p className="text-[14.5px] leading-[1.68] text-[#4C453E] mt-3 max-w-md mx-auto">
                Thank you, {fullName}. Your{' '}
                <strong className="font-medium text-[#171614]">{consultationType}</strong>{' '}
                brief for a{' '}
                <strong className="font-medium text-[#171614]">{roomType}</strong>{' '}
                project has been validated. Connect a CRM or email API endpoint to
                automatically route inquiries to your design advisors.
              </p>
            </div>
            <button
              type="button"
              onClick={resetAndClose}
              className="px-7 py-3 bg-[#292521] text-[#F7F3ED] text-[13px] font-medium tracking-[0.04em] rounded-[3px] hover:bg-[#171614] transition-colors cursor-pointer"
            >
              Return to Atelier Sorel
            </button>
          </div>
        ) : (
          <>
            <div className="mb-7 pr-8">
              <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#574638] mb-2">
                PRIVATE ADVISORY
              </p>
              <h2 className="font-editorial text-[32px] sm:text-[38px] leading-tight text-[#171614]">
                Book a Design Consultation
              </h2>
              <p className="text-[14px] leading-[1.6] text-[#4C453E] mt-2">
                Collaborate with our interior specialists on floor plans, timber
                finishes, and custom upholstery swatches.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="consult-name" className="block text-[12px] font-medium text-[#292521] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="consult-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Soren Lindqvist"
                    className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] focus:border-[#292521] focus:outline-none"
                  />
                  {errors.fullName && (
                    <p className="text-[12px] text-[#7A3528] mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="consult-email" className="block text-[12px] font-medium text-[#292521] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="consult-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] focus:border-[#292521] focus:outline-none"
                  />
                  {errors.email && (
                    <p className="text-[12px] text-[#7A3528] mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="consult-phone" className="block text-[12px] font-medium text-[#292521] mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    id="consult-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+41 44 580 29 10"
                    className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] focus:border-[#292521] focus:outline-none"
                  />
                  {errors.phone && (
                    <p className="text-[12px] text-[#7A3528] mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="consult-type" className="block text-[12px] font-medium text-[#292521] mb-1.5">
                    Preferred Consultation Type
                  </label>
                  <select
                    id="consult-type"
                    value={consultationType}
                    onChange={(e) => setConsultationType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] focus:border-[#292521] focus:outline-none"
                  >
                    <option value="Virtual Video Studio">Virtual Video Studio</option>
                    <option value="In-Showroom Appointment">In-Showroom Appointment</option>
                    <option value="On-Site Residence Visit">On-Site Residence Visit</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="consult-room" className="block text-[12px] font-medium text-[#292521] mb-1.5">
                  Room or Project Type
                </label>
                <select
                  id="consult-room"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] focus:border-[#292521] focus:outline-none"
                >
                  <option value="Living Room">Living Room</option>
                  <option value="Dining Room">Dining Room</option>
                  <option value="Bedroom Suite">Bedroom Suite</option>
                  <option value="Home Office">Home Office</option>
                  <option value="Full Residence">Full Residence</option>
                  <option value="Architectural Trade Project">Architectural Trade Project</option>
                </select>
              </div>

              <div>
                <label htmlFor="consult-message" className="block text-[12px] font-medium text-[#292521] mb-1.5">
                  Additional Message *
                </label>
                <textarea
                  id="consult-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share room dimensions, preferred materials, or target timeline..."
                  className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] focus:border-[#292521] focus:outline-none resize-y"
                />
                {errors.message && (
                  <p className="text-[12px] text-[#7A3528] mt-1">{errors.message}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#292521] text-[#F7F3ED] text-[13px] font-medium tracking-[0.05em] uppercase rounded-[3px] hover:bg-[#171614] transition-colors cursor-pointer"
                >
                  Submit Consultation Request
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
