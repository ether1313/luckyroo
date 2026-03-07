import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/feature/Footer';
import { setPageMeta } from '../../utils/seo';
import { getLogoUrl, getBonusLogoUrl } from '../../data/casinoLogos';
import { getCasinoBySlug } from '../casino-review/casinoData';

const DEFAULT_CARDS = 6;

const TOP_RATED_LIST = [
  { num: 1, name: 'iPay9 Casino', rating: 9.79, logoKey: 'ipay9' },
  { num: 2, name: 'Kingbet9 Casino', rating: 9.81, logoKey: 'kingbet9' },
  { num: 3, name: 'Bigpay77 Casino', rating: 9.73, logoKey: 'bigpay77' },
  { num: 4, name: 'Me99 Casino', rating: 9.53, logoKey: 'me99' },
  { num: 5, name: 'Rolex9 Casino', rating: 9.65, logoKey: 'rolex9' },
  { num: 6, name: 'Gucci9 Casino', rating: 9.86, logoKey: 'gucci9' },
  { num: 7, name: 'PKM9 Casino', rating: 9.39, logoKey: 'pkm9' },
  { num: 8, name: 'MrBean9 Casino', rating: 9.03, logoKey: 'mrbean9' },
  { num: 9, name: 'Micky9 Casino', rating: 9.53, logoKey: 'micky9' },
  { num: 10, name: 'Winnie777 Casino', rating: 9.73, logoKey: 'winnie777' },
  { num: 11, name: 'Bybid9 Casino', rating: 9.08, logoKey: 'bybid9' },
  { num: 12, name: 'Queen13 Casino', rating: 9.28, logoKey: 'queen13' },
  { num: 13, name: 'Ace96au Casino', rating: 9.15, logoKey: 'ace96au' },
];

const BONUSES_LIST = [
  { num: 1, name: 'PKM9 Casino', rating: 9.39, logoKey: 'pkm9' },
  { num: 2, name: 'MrBean9 Casino', rating: 9.03, logoKey: 'mrbean9' },
  { num: 3, name: 'Micky9 Casino', rating: 9.53, logoKey: 'micky9' },
  { num: 4, name: 'Winnie777 Casino', rating: 9.73, logoKey: 'winnie777' },
  { num: 5, name: 'Bybid9 Casino', rating: 9.08, logoKey: 'bybid9' },
  { num: 6, name: 'Queen13 Casino', rating: 9.28, logoKey: 'queen13' },
  { num: 7, name: 'Ace96au Casino', rating: 9.15, logoKey: 'ace96au' },
  { num: 8, name: 'iPay9 Casino', rating: 9.79, logoKey: 'ipay9' },
  { num: 9, name: 'Kingbet9 Casino', rating: 9.61, logoKey: 'kingbet9' },
  { num: 10, name: 'Bigpay77 Casino', rating: 9.31, logoKey: 'bigpay77' },
  { num: 11, name: 'Me99 Casino', rating: 8.53, logoKey: 'me99' },
  { num: 12, name: 'Rolex9 Casino', rating: 9.05, logoKey: 'rolex9' },
  { num: 13, name: 'Gucci9 Casino', rating: 8.56, logoKey: 'gucci9' },
];

export default function HomePage() {
  const [showAllTopRated, setShowAllTopRated] = useState(false);
  const [showAllBonuses, setShowAllBonuses] = useState(false);
  const topRatedToShow = showAllTopRated ? TOP_RATED_LIST : TOP_RATED_LIST.slice(0, DEFAULT_CARDS);
  const bonusesToShow = showAllBonuses ? BONUSES_LIST : BONUSES_LIST.slice(0, DEFAULT_CARDS);

  useEffect(() => {
    setPageMeta(
      "Lucky Roo | Australia's Trusted Online Casino & Pokies Reviews 2025",
      "Lucky Roo – Australia's trusted source for online casino reviews, pokies guides & exclusive bonuses. Compare licensed AU casinos, withdrawal limits & real ratings. For Aussie players. 18+."
    );
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-10 md:py-14 lg:py-16">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 md:mb-2 text-white">AUS Most Trusted</h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-10 bg-gradient-to-r from-[#1a6fff] to-[#0ea5e9] bg-clip-text text-transparent">
              Online Casino Reviews
            </h1>

            <div className="mt-6 md:mt-10">
              <p className="text-[#0ea5e9] text-xs md:text-sm font-semibold tracking-widest mb-1 md:mb-2 uppercase">Our Top Rated</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Online Ewallet Casinos</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Top Rated Casinos */}
      <section className="container mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {topRatedToShow.map((casino) => (
            <div key={casino.num} className="bg-[#1A1A1A] border border-gray-500 rounded-xl p-4 md:p-5 transition-all duration-300 relative">
              <div className="relative mb-3 md:mb-4">
                <img src={getLogoUrl(casino.logoKey)} alt={casino.name} className="w-full h-28 sm:h-32 object-cover rounded-lg border border-gray-500" />
                <span className="absolute -top-2 -left-2 bg-gradient-to-br from-[#3b82f6] via-[#2563eb] to-[#1d4ed8] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                  {casino.num}
                </span>
              </div>
              <h3 className="text-white text-lg md:text-xl font-bold mb-2 md:mb-3">{casino.name}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-white">
                  <i className="ri-star-fill text-[#0ea5e9] mr-1"></i>
                  <span className="font-bold">{casino.rating}</span>
                  <span className="text-gray-500">/10</span>
                </div>
                <Link
                  to={`/casino/${casino.logoKey}-casino`}
                  className="bg-gradient-to-r from-[#1a6fff] to-[#0ea5e9] text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_12px_rgba(26,111,255,0.4)]"
                >
                  READ REVIEW <i className="ri-arrow-right-s-line"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 mb-12 md:mt-8 md:mb-16">
          <button
            type="button"
            onClick={() => setShowAllTopRated((v) => !v)}
            className="px-5 py-2 rounded-full text-sm font-semibold text-[#0ea5e9] border-2 border-[#0ea5e9]/60 bg-transparent hover:bg-[#0ea5e9]/10 hover:border-[#0ea5e9] hover:text-white transition-all duration-200 cursor-pointer"
          >
            {showAllTopRated ? 'VIEW LESS' : 'VIEW ALL'}
          </button>
        </div>

        {/* Casino Bonuses Section */}
        <div className="text-center text-white mb-6 md:mb-8">
          <p className="text-[#0ea5e9] text-xs md:text-sm font-semibold tracking-widest mb-1 md:mb-2 uppercase">Our Best</p>
          <h2 className="text-2xl md:text-3xl font-bold">Ewallet Casino Bonuses</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {bonusesToShow.map((item) => (
            <div key={item.num} className="bg-[#1A1A1A] border border-gray-500 rounded-xl p-4 md:p-5 transition-all duration-300 flex flex-col">
              <div className="flex gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="relative flex-shrink-0">
                  <img src={getBonusLogoUrl(item.logoKey)} alt={item.name} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border border-gray-500" />
                  <span className="absolute -top-2 -left-2 bg-gradient-to-br from-[#3b82f6] via-[#2563eb] to-[#1d4ed8] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                    {item.num}
                  </span>
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <h3 className="text-white text-base md:text-lg font-bold mb-1 md:mb-2">{item.name}</h3>
                  <div className="flex items-center text-white">
                    <i className="ri-star-fill text-[#0ea5e9] mr-1"></i>
                    <span className="font-bold text-sm">{item.rating}</span>
                    <span className="text-gray-500 text-sm">/10</span>
                  </div>
                </div>
              </div>
              <div className="flex-grow">
                <h4 className="text-white font-bold text-base md:text-lg mb-3 md:mb-4">
                  {getCasinoBySlug(item.logoKey)?.bonuses?.[0]?.title ?? 'Casino Bonus'}
                </h4>
              </div>
              <a
                href={getCasinoBySlug(item.logoKey)?.playNowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-[#1a6fff] to-[#0ea5e9] text-white px-4 py-2.5 md:py-3 rounded-lg text-sm font-semibold mb-2 md:mb-3 whitespace-nowrap hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_12px_rgba(26,111,255,0.35)]"
              >
                VIEW BONUS <i className="ri-arrow-right-s-line"></i>
              </a>
              <Link
                to={`/casino/${item.logoKey}-casino`}
                className="text-[#0ea5e9] text-sm underline hover:text-white transition-colors cursor-pointer"
              >
                READ REVIEW
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 mb-8 md:mt-8 md:mb-10">
          <button
            type="button"
            onClick={() => setShowAllBonuses((v) => !v)}
            className="px-5 py-2 rounded-full text-sm font-semibold text-[#0ea5e9] border-2 border-[#0ea5e9]/60 bg-transparent hover:bg-[#0ea5e9]/10 hover:border-[#0ea5e9] hover:text-white transition-all duration-200 cursor-pointer"
          >
            {showAllBonuses ? 'VIEW LESS' : 'VIEW ALL'}
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
