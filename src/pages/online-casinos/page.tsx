import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/feature/Footer';
import { setPageMeta } from '../../utils/seo';
import { getLogoUrlByName } from '../../data/casinoLogos';
import { scrollToElement } from '../../utils/scroll';
import { getCasinoBySlug } from '../casino-review/casinoData';

const casinos = [
  { id: 1, name: 'iPay9', slug: 'ipay9', rating: 9.79, pros: ['Fair T&Cs', 'Strong game diversity'], bonus: ['Free Bonanza Bonus', 'Daily Slot Bonus'], games: ['Bingo', 'Blackjack', 'Baccarat', 'Jackpot Games'] },
  { id: 2, name: 'Kingbet9', slug: 'kingbet9', rating: 9.71, pros: ['Crypto-friendly', 'Fast withdrawals'], bonus: ['Daily Welcome Bonus', 'Weekly Rebates'], games: ['Bingo', 'Blackjack', 'Jackpot Games', 'Baccarat'] },
  { id: 3, name: 'Bigpay77', slug: 'bigpay77', rating: 9.83, pros: ['Trusted operator', 'No withdrawal limits'], bonus: ['Welcome Bonus', 'Daily Slot Bonus'], games: ['Bingo', 'Blackjack', 'Baccarat', 'Jackpot Games'] },
  { id: 4, name: 'Me99', slug: 'me99', rating: 9.53, pros: ['Fiat and crypto', 'Live dealer'], bonus: ['Rebate Bonus 5%', 'Slot Welcome Bonus 50%', 'Every Deposit Random Bonus', 'Daily Easy Step Free 100'], games: ['Bingo', 'Blackjack', 'Baccarat', 'Jackpot Games'] },
  { id: 5, name: 'Rolex9', slug: 'rolex9', rating: 9.05, pros: ['Premium experience', 'Wide game range'], bonus: ['Daily Rebate', 'Special Bonus'], games: ['Bingo', 'Blackjack', 'Baccarat', 'Video Poker'] },
  { id: 6, name: 'Gucci9', slug: 'gucci9', rating: 9.56, pros: ['Licensed', 'Multiple payment options'], bonus: ['Weekly Commission 5%', 'Daily Easy Step Free 100', 'Every Deposit Random Bonus', 'Slot Welcome Bonus 50%'], games: ['Bingo', 'Blackjack', 'Baccarat', 'Jackpot Games'] },
  { id: 7, name: 'PKM9', slug: 'pkm9', rating: 9.39, pros: ['Popular brands', 'Mobile-friendly'], bonus: ['Slot Welcome Bonus 50%', 'Every Deposit Random Bonus', 'Daily Easy Step Free Credit 100', 'Daily Slot Bonus 80%'], games: ['Bingo', 'Blackjack', 'Baccarat', 'Jackpot Games'] },
  { id: 8, name: 'MrBean9', slug: 'mrbean9', rating: 9.03, pros: ['Fun theme', 'Quick payouts'], bonus: ['Daily Easy Step Bonus AUD 100', 'Monday Special Slot Bonus 60%', 'Every Deposit Random Bonus', 'Daily Slot First Deposit 30%'], games: ['Bingo', 'Blackjack', 'Baccarat', 'Jackpot Games'] },
  { id: 9, name: 'Micky9', slug: 'micky9', rating: 9.53, pros: ['Licensed (CGA)', 'Australian banks'], bonus: ['Weekly Rebate 6%', 'Weekly Commission 5%', '365 Random Daily Free', 'Free Credit 103.33'], games: ['Bingo', 'Blackjack', 'Baccarat', 'Jackpot Games'] },
  { id: 10, name: 'Winnie777', slug: 'winnie777', rating: 9.73, pros: ['Generous bonuses', '24/7 support'], bonus: ['Weekly Rebate 7%', 'Every Deposit Random Bonus', 'Free Credit 103.33', '365 Random Daily Free'], games: ['Bingo', 'Blackjack', 'Baccarat', 'Jackpot Games'] },
  { id: 11, name: 'Bybid9', slug: 'bybid9', rating: 9.08, pros: ['No withdrawal limits', 'Responsible gaming'], bonus: ['Daily Rebate', 'Weekly Comms'], games: ['Bingo', 'Blackjack', 'Baccarat', 'Jackpot Games'] },
  { id: 12, name: 'Queen13', slug: 'queen13', rating: 9.28, pros: ['Premium design', 'Fast support'], bonus: ['New Member Free AUD 113', 'TPA Telegram Task Free AUD 35', 'Weekly Rebate Bonus 6%', 'Slot Welcome Bonus 50%'], games: ['Bingo', 'Blackjack', 'Baccarat', 'Jackpot Games'] },
  { id: 13, name: 'Ace96au', slug: 'ace96au', rating: 9.15, pros: ['Australian focus', 'Trusted brand'], bonus: ['Welcome Bonus', 'Daily Bonus'], games: ['Bingo', 'Blackjack', 'Baccarat', 'Jackpot Games'] },
];

const GAME_ICONS: Record<string, string> = {
  Bingo: '/game-icons/bingo.svg',
  Blackjack: '/game-icons/blackjack.svg',
  Baccarat: '/game-icons/baccarat.svg',
  'Jackpot Games': '/game-icons/jackpot.svg',
  'Video Poker': '/game-icons/slots.svg',
  Slots: '/game-icons/slots.svg',
  Roulette: '/game-icons/roulette.svg',
  'Live Casino': '/game-icons/live-games.svg',
};

type Tab = 'ALL' | 'RECOMMENDED' | 'LATEST';
const ITEMS_PER_PAGE = 9;

const RECOMMENDED_SLUGS = ['ipay9', 'kingbet9', 'bigpay77', 'me99', 'rolex9', 'gucci9', 'bybid9'];
const LATEST_SLUGS = ['ace96au'];

export default function OnlineCasinosPage() {
  const [activeTab, setActiveTab] = useState<Tab>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const listTopRef = useRef<HTMLDivElement>(null);
  const pageBgUrl = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/page-bg-dice-light.png`;

  useEffect(() => {
    setPageMeta(
      'Australia Online Casinos | Best Pokies & Ewallet Casinos – Lucky Roo',
      'Compare the best online casinos for Australian players. Honest reviews, pokies, ewallet options, withdrawal limits & Trust Score by Lucky Roo. 18+.'
    );
  }, []);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    scrollToElement(listTopRef.current, { behavior: 'smooth' });
  };

  const filteredCasinos = (() => {
    if (activeTab === 'RECOMMENDED') {
      return casinos.filter((c) => RECOMMENDED_SLUGS.includes(c.slug)).sort((a, b) => b.rating - a.rating);
    }
    if (activeTab === 'LATEST') {
      return casinos.filter((c) => LATEST_SLUGS.includes(c.slug));
    }
    return casinos;
  })();

  const totalPages = Math.ceil(filteredCasinos.length / ITEMS_PER_PAGE);
  const paginated = filteredCasinos.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${pageBgUrl})` }} aria-hidden />
      <div className="relative z-10">
      {/* Page Header */}
      <div className="relative py-14 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-gradient-to-b from-[#1a6fff]/20 to-transparent rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <p className="text-[#0ea5e9] text-sm font-semibold tracking-widest mb-3 uppercase">Browse & Compare</p>
          <h1 className="text-[#081a43] text-3xl md:text-4xl font-extrabold drop-shadow-[0_2px_8px_rgba(255,255,255,0.75)]">Top-Rated Online</h1>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-1 text-[#0f3c96] drop-shadow-[0_2px_8px_rgba(255,255,255,0.75)]">
            Ewallet Casinos in 2026
          </h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#1a6fff]/20">
        <div className="container mx-auto px-4 flex">
          {(['ALL', 'RECOMMENDED', 'LATEST'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-8 py-4 text-sm font-semibold tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab
                  ? 'text-[#0f3c96] border-b-2 border-[#1a6fff]'
                  : 'text-gray-500 hover:text-[#0f3c96]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Casino Grid */}
      <div ref={listTopRef} className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {paginated.map((casino, index) => {
            const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
            const review = getCasinoBySlug(casino.slug);
            const pros = review?.pros?.slice(0, 2) ?? casino.pros;
            const bonusTitles = review?.bonuses?.slice(0, 2).map((b) => b.title) ?? casino.bonus;
            return (
              <div
                key={casino.id}
                className="rounded-xl overflow-hidden border border-[#4aa3ff]/45 bg-[linear-gradient(155deg,rgba(16,45,109,0.97)_0%,rgba(12,86,184,0.86)_48%,rgba(15,165,233,0.74)_100%)] shadow-[0_16px_35px_rgba(10,50,140,0.38)] hover:shadow-[0_20px_40px_rgba(15,112,255,0.45)] transition-all duration-300"
              >
                {/* Casino Image */}
                <div className="relative">
                  <img src={getLogoUrlByName(casino.name)} alt={casino.name} className="w-full h-40 object-cover" />
                  <span className="absolute top-3 left-3 bg-gradient-to-br from-[#7ad7ff] via-[#38b6ff] to-[#1f8fff] text-[#062b66] w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shadow-[0_0_10px_rgba(59,130,246,0.55)]">
                    {globalIndex}
                  </span>
                </div>

                <div className="p-4 md:p-5 flex flex-col">
                  {/* Name & Rating - top row */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white text-base md:text-lg font-bold">{casino.name}</h3>
                    <div className="flex items-center gap-1">
                      <i className="ri-star-fill text-yellow-400 text-sm"></i>
                      <span className="text-white font-bold text-sm">{casino.rating.toFixed(2)}</span>
                      <span className="text-gray-500 text-sm">/10</span>
                    </div>
                  </div>

                  {/* Buttons - fixed order: READ REVIEW (outline), PLAY NOW (primary) */}
                  <div className="flex gap-2 mb-4">
                    <Link
                      to={`/casino/${casino.slug}-casino`}
                      className="flex-1 bg-gradient-to-r from-[#ff8a00] to-[#ff3d6e] text-white py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap text-center shadow-[0_10px_24px_rgba(255,75,80,0.45)]"
                    >
                      READ REVIEW
                    </Link>
                    <a
                      href={casino.playNowUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-[#14b8a6] to-[#06b6d4] text-white py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap text-center shadow-[0_10px_24px_rgba(6,182,212,0.4)]"
                    >
                      PLAY NOW &rsaquo;
                    </a>
                  </div>

                  {/* Lower content: Pros | Bonus | Games - clear sections */}
                  <div className="space-y-4 mt-auto">
                    <div>
                      <p className="text-white font-bold text-sm mb-1.5">Pros</p>
                      <ul className="space-y-1">
                        {pros.map((pro) => (
                          <li key={pro} className="flex items-center gap-2 text-gray-300 text-xs">
                            <i className="ri-thumb-up-line text-[#4a9eff] flex-shrink-0 text-sm"></i>
                            <span className="text-[#e8f4ff]">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm mb-1.5">Bonus</p>
                      <ul className="space-y-1">
                        {bonusTitles.map((title) => (
                          <li key={title} className="flex items-center gap-2 text-gray-300 text-xs">
                            <i className="ri-gift-line text-[#4a9eff] flex-shrink-0 text-sm"></i>
                            <span className="text-[#e8f4ff]">{title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm mb-2">Games</p>
                      <div className="flex flex-wrap gap-3">
                        {casino.games.map((game) => (
                          <div key={game} className="flex flex-col items-center gap-1 min-w-[4rem]">
                            <div className="w-9 h-9 flex items-center justify-center bg-[#0f3b8f]/50 border border-[#9fd4ff]/40 rounded-lg">
                              <img
                                src={GAME_ICONS[game] ?? '/game-icons/slots.svg'}
                                alt=""
                                className="w-5 h-5 object-contain invert opacity-80"
                              />
                            </div>
                            <span className="text-[#d6ebff] text-[10px] text-center leading-tight">{game}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="mt-6 md:mt-8 flex flex-col items-center gap-3 md:gap-4">
          <p className="text-[#475569] text-sm">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredCasinos.length)} of{' '}
            {filteredCasinos.length} online casinos
          </p>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-[#1a6fff] to-[#0ea5e9] text-white shadow-[0_0_12px_rgba(26,111,255,0.4)]'
                    : 'bg-white border border-[#b9cff9] text-[#475569] hover:text-[#0f3c96] hover:border-[#1a6fff]/50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      </div>
    </div>
  );
}
