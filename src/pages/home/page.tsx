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
  { num: 1, name: 'PKM9 CASINO', rating: 9.39, logoKey: 'pkm9' },
  { num: 2, name: 'MRBEAN9 CASINO', rating: 9.03, logoKey: 'mrbean9' },
  { num: 3, name: 'MICKY9 CASINO', rating: 9.53, logoKey: 'micky9' },
  { num: 4, name: 'WINNIE777 CASINO', rating: 9.73, logoKey: 'winnie777' },
  { num: 5, name: 'BYBID9 CASINO', rating: 9.08, logoKey: 'bybid9' },
  { num: 6, name: 'QUEEN13 CASINO', rating: 9.28, logoKey: 'queen13' },
  { num: 7, name: 'ACE96AU CASINO', rating: 9.15, logoKey: 'ace96au' },
  { num: 8, name: 'IPAY9 CASINO', rating: 9.79, logoKey: 'ipay9' },
  { num: 9, name: 'KINGBET9 CASINO', rating: 9.61, logoKey: 'kingbet9' },
  { num: 10, name: 'BIGPAY77 CASINO', rating: 9.31, logoKey: 'bigpay77' },
  { num: 11, name: 'ME99 CASINO', rating: 8.53, logoKey: 'me99' },
  { num: 12, name: 'ROLEX9 CASINO', rating: 9.05, logoKey: 'rolex9' },
  { num: 13, name: 'GUCCI9 CASINO', rating: 8.56, logoKey: 'gucci9' },
];

export default function HomePage() {
  const [showAllTopRated, setShowAllTopRated] = useState(false);
  const [showAllBonuses, setShowAllBonuses] = useState(false);
  const topRatedToShow = showAllTopRated ? TOP_RATED_LIST : TOP_RATED_LIST.slice(0, DEFAULT_CARDS);
  const bonusesToShow = showAllBonuses ? BONUSES_LIST : BONUSES_LIST.slice(0, DEFAULT_CARDS);
  const pageBgUrl = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/page-bg-dice-light.png`;

  useEffect(() => {
    setPageMeta(
      "LuckyRoo | Australia's Trusted Online Casino & Pokies Reviews",
      "LuckyRoo – Australia's trusted source for online casino reviews, pokies guides & exclusive bonuses. Compare licensed AU casinos, withdrawal limits & real ratings. For Aussie players. 18+."
    );
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${pageBgUrl})` }} aria-hidden />
      <div className="relative z-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 pt-10 pb-3 md:pt-14 md:pb-4 lg:pt-16 lg:pb-5">
          <div className="text-center text-[#0f172a]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-1 md:mb-2 text-[#081a43] drop-shadow-[0_2px_8px_rgba(255,255,255,0.75)]">AUS Most Trusted</h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 md:mb-10 text-[#0f3c96] drop-shadow-[0_2px_8px_rgba(255,255,255,0.75)]">
              Online Casino Reviews
            </h1>

            <div className="mt-6 md:mt-10">
              <p className="text-[#ff1d1d] text-xs md:text-sm font-semibold tracking-widest mb-1 md:mb-2 uppercase">Our Top Rated</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#081a43] drop-shadow-[0_2px_8px_rgba(255,255,255,0.75)]">Online Ewallet Casinos</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Top Rated Casinos */}
      <section className="container mx-auto px-4 pt-2 pb-8 md:pt-3 md:pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {topRatedToShow.map((casino) => (
            <div
              key={casino.num}
              className="rounded-xl p-3 md:p-5 transition-all duration-300 relative border border-[#4aa3ff]/45 bg-[#1457b8] shadow-[0_16px_35px_rgba(10,50,140,0.38)] hover:shadow-[0_20px_40px_rgba(15,112,255,0.45)]"
            >
              <div className="relative mb-3 md:mb-4">
                <img
                  src={getLogoUrl(casino.logoKey)}
                  alt={casino.name}
                  className="mx-auto w-full h-auto object-contain rounded-lg border border-[#7ec9ff]/70 shadow-[0_0_18px_rgba(45,162,255,0.35)]"
                />
                <span className="absolute -top-2 -left-2 bg-gradient-to-br from-[#7ad7ff] via-[#38b6ff] to-[#1f8fff] text-[#062b66] w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold shadow-[0_0_14px_rgba(49,187,255,0.72)]">
                  {casino.num}
                </span>
              </div>
              <h3 className="text-white text-lg md:text-xl font-bold mb-2 md:mb-3 leading-tight">{casino.name}</h3>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center text-white text-sm md:text-base">
                  <i className="ri-star-fill text-[#ffe27a] mr-1"></i>
                  <span className="font-bold">{casino.rating}</span>
                  <span className="text-[#d8ebff]">/10</span>
                </div>
                <Link
                  to={`/casino/${casino.logoKey}-casino`}
                  className="w-full sm:w-auto text-center bg-gradient-to-r from-[#ff8a00] to-[#ff3d6e] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-bold whitespace-nowrap hover:opacity-90 transition-opacity cursor-pointer shadow-[0_10px_24px_rgba(255,75,80,0.45)]"
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
            className="px-5 py-2 rounded-full text-sm font-bold text-white border-0 bg-gradient-to-r from-[#ff8a00] to-[#ff3d6e] hover:opacity-90 transition-all duration-200 cursor-pointer shadow-[0_10px_22px_rgba(255,75,80,0.4)]"
          >
            {showAllTopRated ? 'VIEW LESS' : 'VIEW ALL'}
          </button>
        </div>

        {/* Casino Bonuses Section */}
        <div className="text-center text-[#0f172a] mb-6 md:mb-8">
          <p className="text-[#ff1d1d] text-xs md:text-sm font-semibold tracking-widest mb-1 md:mb-2 uppercase">Our Best</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#081a43] drop-shadow-[0_2px_8px_rgba(255,255,255,0.75)]">Ewallet Casino Bonuses</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {bonusesToShow.map((item) => (
            <div
              key={item.num}
              className="rounded-xl p-3 md:p-4 transition-all duration-300 border border-[#4aa3ff]/45 bg-[#1a62c9] shadow-[0_14px_30px_rgba(9,47,128,0.32)] hover:shadow-[0_18px_36px_rgba(19,123,255,0.4)] flex flex-col"
            >
              <div className="grid grid-cols-[6rem_minmax(0,1fr)] md:grid-cols-[7.2rem_minmax(0,1fr)] gap-3 md:gap-4 items-start">
                <div className="relative flex-shrink-0">
                  <div className="w-[6rem] h-[6rem] md:w-[7.2rem] md:h-[7.2rem] flex items-center justify-center">
                    <img
                      src={getBonusLogoUrl(item.logoKey)}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain rounded-md shadow-[0_0_12px_rgba(45,162,255,0.28)]"
                    />
                  </div>
                  <span className="absolute -top-2 -left-2 bg-gradient-to-br from-[#7ad7ff] via-[#38b6ff] to-[#1f8fff] text-[#062b66] w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold shadow-[0_0_12px_rgba(49,187,255,0.72)]">
                    {item.num}
                  </span>
                </div>
                <div className="flex flex-col min-w-0 flex-1 pl-0.5 md:pl-1.5 pt-0.5">
                  <h3 className="text-white text-lg md:text-xl font-bold mb-1 leading-tight break-words">{item.name}</h3>
                  <div className="flex items-center text-white text-sm mb-1.5">
                    <i className="ri-star-fill text-[#ffe27a] mr-1"></i>
                    <span className="font-bold text-sm">{item.rating}</span>
                    <span className="text-[#d8ebff] text-sm">/10</span>
                  </div>
                  <p className="text-[#bfe2ff] text-[11px] md:text-xs font-semibold uppercase tracking-wide mb-1">Bonus Details:</p>
                  <h4 className="text-white font-bold text-sm md:text-base mb-2 leading-snug line-clamp-2">
                  {getCasinoBySlug(item.logoKey)?.bonuses?.[0]?.title ?? 'Casino Bonus'}
                </h4>
                </div>
              </div>
              <div className="mt-2 md:mt-2.5 flex items-center gap-2">
                <Link
                  to={`/casino/${item.logoKey}-casino`}
                  className="flex-1 text-center bg-[#0f4ea8] border border-[#8bc5ff]/55 text-white px-3 py-2 rounded-lg text-xs md:text-sm font-bold whitespace-nowrap hover:bg-[#0c438f] transition-colors cursor-pointer"
                >
                  READ REVIEW
                </Link>
                <a
                  href={getCasinoBySlug(item.logoKey)?.playNowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-gradient-to-r from-[#ff8a00] to-[#ff3d6e] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-bold whitespace-nowrap hover:opacity-90 transition-opacity cursor-pointer shadow-[0_10px_24px_rgba(255,75,80,0.45)]"
                >
                  VIEW BONUS <i className="ri-arrow-right-s-line"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 mb-8 md:mt-8 md:mb-10">
          <button
            type="button"
            onClick={() => setShowAllBonuses((v) => !v)}
            className="px-5 py-2 rounded-full text-sm font-bold text-white border-0 bg-gradient-to-r from-[#ff8a00] to-[#ff3d6e] hover:opacity-90 transition-all duration-200 cursor-pointer shadow-[0_10px_22px_rgba(255,75,80,0.4)]"
          >
            {showAllBonuses ? 'VIEW LESS' : 'VIEW ALL'}
          </button>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
}
