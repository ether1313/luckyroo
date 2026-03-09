import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/feature/Footer';
import { setPageMeta } from '../../utils/seo';
import { getLogoUrl } from '../../data/casinoLogos';
import { scrollToElement } from '../../utils/scroll';
import { getCasinoBySlug } from '../casino-review/casinoData';

type Tab = 'ALL' | 'RECOMMENDED' | 'LATEST';
const ITEMS_PER_PAGE = 9;

const RECOMMENDED_SLUGS = ['ipay9', 'kingbet9', 'bigpay77', 'me99', 'winnie777', 'rolex9', 'gucci9', 'micky9', 'pkm9', 'mrbean9', 'queen13'];
const LATEST_SLUGS = ['ace96au'];

const bonuses = [
  { id: 1, name: 'iPay9 Casino', slug: 'ipay9', rating: 9.79, bonuses: [{ title: 'Free Bonanza Bonus', desc: 'Claim A$30 free credit upon registration' }, { title: 'Daily Slot Bonus', desc: 'Daily slot bonus for first-time depositors' }, { title: 'Limited Free Bonus', desc: 'Unlock up to A$3 in free credits daily' }, { title: 'Saturday Special Bonus', desc: 'Claim up to A$200 on Saturdays only' }] },
  { id: 2, name: 'Kingbet9 Casino', slug: 'kingbet9', rating: 9.61, bonuses: [{ title: 'Daily Welcome Bonus', desc: 'Daily deposit bonus for slot players' }, { title: 'Weekly Rebates', desc: 'Claim cashback on net losses and rollover' }, { title: 'No Deposit Bonus', desc: 'Enjoy A$19.60 free credit, no deposit required' }, { title: 'Unlimited Reload Bonus', desc: 'Unlimited slot reload bonus on every deposit' }] },
  { id: 3, name: 'Bigpay77 Casino', slug: 'bigpay77', rating: 9.31, bonuses: [{ title: 'Welcome Bonus', desc: 'Claim A$29.60 free credit on sign-up' }, { title: 'Daily Slot Bonus', desc: 'Get 10% extra on your first daily deposit' }, { title: 'Daily Accumulated Bonus', desc: 'Deposit A$100 and claim A$6.66 daily' }, { title: 'Unlimited Daily Deposit Bonus', desc: 'Earn 6% bonus on every deposit' }] },
  { id: 4, name: 'Me99 Casino', slug: 'me99', rating: 8.53, bonuses: [{ title: 'Rebate Bonus 5%', desc: 'Daily 5% rebate on net loss; rollover x3, min withdraw AUD 30, max AUD 599' }, { title: 'Every Deposit Random Bonus', desc: 'Unlimited claims daily, min deposit AUD 20; random AUD 0.10–5.00, rollover x1.5' }, { title: 'Slot Welcome Bonus 50%', desc: 'New members once only; min deposit AUD 50, max bonus AUD 250, rollover x6' }, { title: 'Daily Easy Step Free 100', desc: 'Claim once daily; share referral link in 5 Facebook groups; WF2 games, max withdraw AUD 20' }] },
  { id: 5, name: 'Rolex9 Casino', slug: 'rolex9', rating: 9.05, bonuses: [{ title: 'Daily Rebate & Commission', desc: 'Up to 0.5% daily rebate & 5% weekly cashback' }, { title: 'Special Bonus', desc: 'Unlock for exclusive rewards' }, { title: 'Welcome Bonus', desc: 'Register free and claim A$28.88 bonus' }, { title: '88% Welcome Bonus', desc: 'Enjoy 88% bonus up to A$500' }] },
  { id: 6, name: 'Gucci9 Casino', slug: 'gucci9', rating: 8.56, bonuses: [{ title: 'Weekly Commission 5%', desc: 'Every Monday 12:00 PM; based on downline net; rollover x10, min AUD 50, max AUD 599' }, { title: 'Daily Easy Step Free 100', desc: 'Claim daily; share referral in 5 Facebook groups; WF2 games, max withdraw AUD 20' }, { title: 'Every Deposit Random Bonus', desc: 'Unlimited daily; min deposit AUD 10; random AUD 0.10–5.00, rollover x1.5' }, { title: 'Slot Welcome Bonus 50%', desc: 'New members once only; min deposit AUD 50, max bonus AUD 250, rollover x6' }] },
  { id: 7, name: 'PKM9 Casino', slug: 'pkm9', rating: 8.39, bonuses: [{ title: 'Slot Welcome Bonus 50%', desc: 'New members once only; min deposit AUD 50, max bonus AUD 250; rollover x6' }, { title: 'Every Deposit Random Bonus', desc: 'Unlimited daily; min deposit AUD 10; random AUD 0.10–5.00, rollover x1.5' }, { title: 'Daily Easy Step Free Credit 100', desc: 'Claim daily; share referral in 5 Facebook groups; WF2 games, max withdraw AUD 20' }, { title: 'Daily Slot Bonus 80%', desc: 'Once per day; min deposit AUD 50, no max bonus; designated slots, turnover x3–x10' }] },
  { id: 8, name: 'MrBean9 Casino', slug: 'mrbean9', rating: 8.03, bonuses: [{ title: 'Daily Easy Step Bonus AUD 100', desc: 'Claim daily; share referral in 5 Facebook groups with poster; WF2 games, max withdraw AUD 20' }, { title: 'Monday Special Slot Bonus 60%', desc: 'Once every Monday; min deposit AUD 19, max bonus AUD 300; rollover x4' }, { title: 'Every Deposit Random Bonus', desc: 'Unlimited daily; min deposit AUD 10; random AUD 0.10–5.00, rollover x1.5' }, { title: 'Daily Slot First Deposit 30%', desc: 'Once per day; min deposit AUD 10, max bonus AUD 150; rollover x6' }] },
  { id: 9, name: 'Micky9 Casino', slug: 'micky9', rating: 9.53, bonuses: [{ title: 'Weekly Rebate 6%', desc: 'Weekly rebate on net loss; issued Monday 00:00–00:15 AM; rollover x5, min AUD 50, max AUD 599' }, { title: 'Weekly Commission 5%', desc: 'Downline net loss; issued Monday 12:00 PM; rollover x10, min AUD 50, max AUD 599' }, { title: '365 Random Daily Free', desc: 'No deposit; claim random AUD 5–13 daily; WF/AFB777/EVO888H5 slots; max withdraw AUD 13' }, { title: 'Free Credit 103.33', desc: 'No deposit, claim once; follow CS steps; max withdraw AUD 20' }] },
  { id: 10, name: 'Winnie777 Casino', slug: 'winnie777', rating: 9.73, bonuses: [{ title: 'Weekly Rebate 7%', desc: 'Every Monday 00:00–00:15 AM; based on weekly net loss; rollover x5, min AUD 50, max AUD 599' }, { title: 'Every Deposit Random Bonus', desc: 'Unlimited daily; min deposit AUD 10; random AUD 0.10–5.00, rollover x1.5' }, { title: 'Free Credit 103.33', desc: 'Claim once; complete CS steps; WF/AFB777/EVO888H5 slots; max withdraw AUD 20' }, { title: '365 Random Daily Free', desc: 'Claim random AUD 5–13 daily; hit AUD 399 to withdraw, max AUD 13' }] },
  { id: 11, name: 'Bybid9 Casino', slug: 'bybid9', rating: 9.08, bonuses: [{ title: 'Daily Rebate', desc: 'Up to 0.5% daily rebate' }, { title: 'Weekly Comms', desc: '5% weekly cashback' }, { title: 'Welcome Bonus', desc: 'Register and claim bonus' }, { title: 'Special Bonus', desc: 'Exclusive rewards' }] },
  { id: 12, name: 'Queen13 Casino', slug: 'queen13', rating: 9.28, bonuses: [{ title: 'New Member Free AUD 113', desc: 'Claim once; event game only, Queen13 APP; hit AUD 2000 to withdraw, max AUD 20' }, { title: 'TPA Telegram Task Free AUD 35', desc: 'Complete Telegram tasks; event/slot only; hit AUD 500 to withdraw, max AUD 10' }, { title: 'Weekly Rebate Bonus 6%', desc: 'Every Monday 12am; based on weekly net; rollover x10, min AUD 50, max AUD 999' }, { title: 'Slot Welcome Bonus 50%', desc: 'New members once; min deposit AUD 50, max bonus AUD 250; rollover x6' }] },
  { id: 13, name: 'Ace96au Casino', slug: 'ace96au', rating: 9.15, bonuses: [{ title: 'Welcome Bonus', desc: 'Australian players welcome offer' }, { title: 'Daily Bonus', desc: 'Daily slot bonus' }, { title: 'Weekly Special', desc: 'Weekly deposit bonus' }, { title: 'VIP Rewards', desc: 'Loyalty program' }] },
];

function BonusCard({ casino, index, expandedKey, onToggle }: {
  casino: typeof bonuses[0];
  index: number;
  expandedKey: string | null;
  onToggle: (key: string) => void;
}) {
  const review = getCasinoBySlug(casino.slug);
  const displayBonuses = review?.bonuses?.length
    ? review.bonuses.map((b) => ({
        title: b.title,
        fromReview: true as const,
        bonusRequirement: b.bonusRequirement,
        withdrawRequirement: b.withdrawRequirement,
        termAndCondition: b.termAndCondition,
      }))
    : casino.bonuses.map((b) => ({ title: b.title, fromReview: false as const, desc: b.desc }));

  return (
    <div className="rounded-xl overflow-hidden border border-[#4aa3ff]/45 bg-[linear-gradient(155deg,rgba(16,45,109,0.97)_0%,rgba(12,86,184,0.86)_48%,rgba(15,165,233,0.74)_100%)] shadow-[0_16px_35px_rgba(10,50,140,0.38)] hover:shadow-[0_20px_40px_rgba(15,112,255,0.45)] transition-all duration-300">
      {/* Casino Image */}
      <div className="relative">
        <img src={getLogoUrl(casino.slug)} alt={casino.name} className="w-full h-40 object-cover rounded-lg border-2 border-[#0ea5e9]" />
        <span className="absolute top-3 left-3 bg-gradient-to-br from-[#7ad7ff] via-[#38b6ff] to-[#1f8fff] text-[#062b66] w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shadow-[0_0_10px_rgba(59,130,246,0.55)]">
          {index}
        </span>
      </div>

      <div className="p-4 md:p-5">
        {/* Name & Rating */}
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h3 className="text-white text-lg font-bold">{casino.name}</h3>
          <div className="flex items-center gap-1">
            <i className="ri-star-fill text-[#0ea5e9] text-sm"></i>
            <span className="text-white font-bold text-sm">{casino.rating.toFixed(2)}</span>
            <span className="text-[#d8ebff] text-sm">/10</span>
            <Link
              to={`/casino/${casino.slug}-casino`}
              className="ml-2 text-[#dff2ff] text-xs font-bold hover:text-white transition-colors cursor-pointer whitespace-nowrap uppercase tracking-wide"
            >
              Read Review
            </Link>
          </div>
        </div>

        {/* Bonus List */}
        <div className="space-y-2 mb-3 md:mb-4">
          {displayBonuses.map((bonus, i) => {
            const rowKey = `${casino.id}-${i}`;
            const isExpanded = expandedKey === rowKey;
            return (
            <div key={`${bonus.title}-${i}`} className="border-b border-[#9fd4ff]/30 last:border-0">
              <button
                onClick={() => onToggle(isExpanded ? '' : rowKey)}
                className="w-full flex items-center justify-between py-2.5 text-left cursor-pointer group"
              >
                <span className="text-white text-sm font-semibold group-hover:text-[#d7eeff] transition-colors">
                  {bonus.title}
                </span>
                <i className={`ri-arrow-down-s-line text-[#d7eeff] text-lg transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}></i>
              </button>
              {isExpanded && (
                <div className="text-[#e7f4ff] text-xs pb-2.5 pl-1">
                  {bonus.fromReview ? (
                    <p>{bonus.bonusRequirement}</p>
                  ) : (
                    <p>{bonus.desc}</p>
                  )}
                </div>
              )}
            </div>
          );
          })}
        </div>

        {/* View Bonus Button */}
        <a
          href={review?.playNowUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-gradient-to-r from-[#ff8a00] to-[#ff3d6e] text-white py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap shadow-[0_10px_24px_rgba(255,75,80,0.45)] tracking-wide text-center no-underline"
        >
          VIEW BONUS &rsaquo;
        </a>
      </div>
    </div>
  );
}

export default function BonusesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const listTopRef = useRef<HTMLDivElement>(null);
  const pageBgUrl = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/page-bg-dice-light.png`;

  useEffect(() => {
    setPageMeta(
      'Australia Casino Bonuses | Exclusive Offers & Free Spins – Lucky Roo',
      'Compare casino bonuses for Australian players: welcome offers, free spins, rebates & exclusive promos. Trust Score by Lucky Roo. 18+.'
    );
  }, []);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    scrollToElement(listTopRef.current, { behavior: 'smooth' });
  };

  const filtered = (() => {
    if (activeTab === 'RECOMMENDED') {
      return bonuses.filter((b) => RECOMMENDED_SLUGS.includes(b.slug)).sort((a, b) => b.rating - a.rating);
    }
    if (activeTab === 'LATEST') {
      return bonuses.filter((b) => LATEST_SLUGS.includes(b.slug));
    }
    return bonuses;
  })();

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setExpandedKey(null);
  };

  const handleToggle = (key: string) => {
    setExpandedKey((prev) => (prev === key || !key ? null : key));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${pageBgUrl})` }} aria-hidden />
      <div className="relative z-10">
      {/* Page Header */}
      <div className="relative py-10 md:py-12 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-gradient-to-b from-[#1a6fff]/20 to-transparent rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-[#081a43] text-3xl md:text-4xl font-extrabold drop-shadow-[0_2px_8px_rgba(255,255,255,0.75)]">Best Casino Bonuses</h1>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-1 text-[#0f3c96] drop-shadow-[0_2px_8px_rgba(255,255,255,0.75)]">
            to Claim in 2026
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

      {/* Bonus Grid */}
      <div ref={listTopRef} className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {paginated.map((casino, index) => {
            const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
            return (
              <BonusCard
                key={casino.id}
                casino={casino}
                index={globalIndex}
                expandedKey={expandedKey}
                onToggle={handleToggle}
              />
            );
          })}
        </div>

        {/* Pagination */}
        <div className="mt-6 md:mt-8 flex flex-col items-center gap-3 md:gap-4">
          <p className="text-[#475569] text-sm">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
            {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of{' '}
            {filtered.length} online casinos
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 rounded-lg text-sm font-semibold bg-white border border-[#b9cff9] text-[#475569] hover:text-[#0f3c96] hover:border-[#1a6fff]/50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
            >
              <i className="ri-arrow-left-s-line"></i>
            </button>
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
            <button
              onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-9 h-9 rounded-lg text-sm font-semibold bg-white border border-[#b9cff9] text-[#475569] hover:text-[#0f3c96] hover:border-[#1a6fff]/50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
            >
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        </div>
      </div>

      <Footer />
      </div>
    </div>
  );
}
