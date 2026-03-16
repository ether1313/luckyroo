import { useEffect, useRef, useState } from 'react';

const POPUP_CONTENT = {
  title: 'LuckyRoo: Top Australian Online Pokies & Casino Reviewer',
  description:
    'LuckyRoo invites Aussie visitors to explore hundreds of online pokies reviews prepared by our expert team. Test their demos and scroll through the lists of reliable online casinos from top providers. Educational guides, bonus analysis articles and free communication space Talks are waiting for you here!',
};

const CARDS = [
  {
    key: 'free-pokies',
    label: 'FREE POKIES',
    value: '1330+ GAMES',
    iconSrc: '/popup-icons/free-pokies.png',
  },
  {
    key: 'online-casinos',
    label: 'ONLINE CASINOS',
    value: '550+ BRANDS',
    iconSrc: '/popup-icons/online-casinos.png',
  },
  {
    key: 'bonuses',
    label: 'BONUSES',
    value: '1300+ PROMOS',
    iconSrc: '/popup-icons/bonuses.png',
  },
  {
    key: 'providers',
    label: 'PROVIDERS',
    value: '150+ BRANDS',
    iconSrc: '/popup-icons/providers.png',
  },
] as const;

export default function WelcomePopup() {
  const [open, setOpen] = useState(true);
  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      setEntered(true);
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const closePopup = () => {
    setClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
    }, 260);
  };

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${entered && !closing ? 'opacity-100' : 'opacity-0'} bg-[#0a1c44]/65`}
      role="dialog"
      aria-modal="true"
      aria-label="Website introduction"
    >
      <div
        className={`w-full max-w-5xl rounded-2xl border border-[#c9d9ff] bg-white shadow-[0_28px_80px_rgba(10,28,68,0.35)] overflow-hidden transition-all duration-300 ${
          entered && !closing ? 'translate-y-0 scale-100' : 'translate-y-3 scale-[0.98]'
        }`}
      >
        <div className="relative p-5 md:p-8 bg-[radial-gradient(circle_at_top,_rgba(56,114,231,0.14),_rgba(255,255,255,1)_62%)]">
          <button
            type="button"
            onClick={closePopup}
            className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center text-[#375da7] hover:text-[#12326e] hover:bg-[#edf3ff] transition-colors"
            aria-label="Close popup"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>

          <h2 className="text-[#0f2b63] text-2xl md:text-4xl font-extrabold max-w-4xl leading-tight pr-8">{POPUP_CONTENT.title}</h2>
          <p className="text-[#1f3768] text-sm md:text-base mt-4 md:mt-5 max-w-4xl leading-relaxed">{POPUP_CONTENT.description}</p>

          <div className="mt-6 md:mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {CARDS.map((card) => (
                <div key={card.key} className="rounded-xl border border-[#d3e0ff] bg-[#f7faff] p-3 md:p-4">
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-lg bg-[#eaf1ff] border border-[#d3e0ff] flex items-center justify-center mb-3">
                    <img src={card.iconSrc} alt="" className="w-7 h-7 md:w-8 md:h-8 object-contain" />
                  </div>
                  <p className="text-[#0f2b63] font-bold tracking-wide text-base md:text-[1.05rem] md:leading-tight">{card.label}</p>
                  <p className="text-[#2f5fb8] text-base md:text-[0.95rem] mt-1 font-semibold md:leading-tight">{card.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
