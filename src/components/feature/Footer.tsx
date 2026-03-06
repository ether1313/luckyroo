
import { Link } from 'react-router-dom';
import LuckyRooLogo from './LuckyRooLogo';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] border-t border-[#1a6fff]/20 mt-8 md:mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Brand */}
          <div>
            <LuckyRooLogo size="lg" />
            <p className="text-gray-400 text-sm mt-3 md:mt-4 leading-relaxed">
              Your trusted source for honest casino reviews, exclusive bonuses, and the latest online gambling news in Australia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-3 md:mb-4">Quick Links</h4>
            <ul className="space-y-1.5 md:space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#4a9eff] transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/australia-online-casinos" className="text-gray-400 hover:text-[#4a9eff] transition-colors text-sm">
                  Online Casinos
                </Link>
              </li>
              <li>
                <Link to="/australia-casino-bonuses" className="text-gray-400 hover:text-[#4a9eff] transition-colors text-sm">
                  Bonuses
                </Link>
              </li>
            </ul>
          </div>

          {/* Responsible Gambling */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-3 md:mb-4">Responsible Gambling</h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-2 md:mb-3">
              Gambling should be fun. If you feel it's becoming a problem, please seek help.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <img src="/responsible-gambling/gambling-therapy.png" alt="Gambling Therapy" className="h-8 w-auto object-contain" />
              <img src="/responsible-gambling/ecogra.png" alt="eCOGRA" className="h-8 w-auto object-contain" />
              <img src="/responsible-gambling/play-responsibly.png" alt="18+ Play Responsibly" className="h-8 w-auto object-contain" />
              <img src="/responsible-gambling/gambling-help-online.png" alt="Gambling Help Online" className="h-8 w-auto object-contain" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1a6fff]/10 pt-4 md:pt-6 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          <p className="text-gray-500 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Lucky Roo. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs text-center">
            Please gamble responsibly. 18+ only.
          </p>
        </div>
      </div>
    </footer>
  );
}
