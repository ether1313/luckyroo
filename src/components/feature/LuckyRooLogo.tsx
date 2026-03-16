import { Link } from 'react-router-dom';

const LOGO_SRC = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/luckyroo-logo.png`;

interface LuckyRooLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LuckyRooLogo({ className = '', size = 'md' }: LuckyRooLogoProps) {
  const sizes = {
    sm: { img: 'w-8 h-8', text: 'text-base', sub: 'text-[9px]' },
    md: { img: 'w-10 h-10', text: 'text-xl', sub: 'text-[10px]' },
    lg: { img: 'w-14 h-14', text: 'text-2xl', sub: 'text-xs' },
  };
  const s = sizes[size];

  return (
    <a href="/" className={`flex items-center gap-2.5 no-underline ${className}`}>
      <img
        src={LOGO_SRC}
        alt="LuckyRoo"
        className={`${s.img} object-contain flex-shrink-0`}
      />
      <div className="flex flex-col leading-none">
        <span className={`${s.text} font-extrabold tracking-tight text-white whitespace-nowrap`}>
          LuckyRoo.
        </span>
      </div>
    </a>
  );
}
