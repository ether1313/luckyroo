import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import { getCasinoBySlug } from './casinoData';
import Footer from '../../components/feature/Footer';
import { setPageMeta } from '../../utils/seo';

const GAMES_DEFAULT_COUNT = 4;
const PAYMENTS_DEFAULT_COUNT = 4;

/** Normalize URL slug to casino key: "me99-casino" -> "me99" */
function slugToCasinoKey(slug: string): string {
  return slug.toLowerCase().endsWith('-casino') ? slug.slice(0, -7) : slug;
}

export default function CasinoReview() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter');
  const contentTab = filter === 'bonuses' ? 'bonuses' : 'overview';
  const casinoKey = slug ? slugToCasinoKey(slug) : '';
  const casino = casinoKey ? getCasinoBySlug(casinoKey) : undefined;
  const formalSlug = casino ? `${casino.slug}-casino` : (slug || '');

  const [showWithdrawalDetails, setShowWithdrawalDetails] = useState(false);
  const [showGamesPopup, setShowGamesPopup] = useState(false);
  const [showPaymentsPopup, setShowPaymentsPopup] = useState(false);

  const closeGamesPopup = useCallback(() => setShowGamesPopup(false), []);
  const closePaymentsPopup = useCallback(() => setShowPaymentsPopup(false), []);

  // Disable background scroll when any popup is open
  useEffect(() => {
    const open = showGamesPopup || showPaymentsPopup;
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showGamesPopup, showPaymentsPopup]);

  // SEO: per-casino title and description (runs when casino is loaded)
  useEffect(() => {
    if (casino) {
      const title = `${casino.name} Casino Review Australia | Lucky Roo`;
      const desc =
        casino.summary.length > 155
          ? casino.summary.slice(0, 152) + '…'
          : casino.summary;
      setPageMeta(title, desc);
    }
  }, [casino?.slug]);

  if (!casino) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#0f172a] mb-4">Casino Not Found</h1>
          <p className="text-gray-600">The casino you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const games = casino.games;
  const paymentMethods = casino.banking.paymentMethods;

  return (
    <div className="min-h-screen text-[#0f172a]">
      {/* Two-column: Sidebar left, Content right. Right column has Overview | Bonuses tabs. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Company review (on mobile shows first; Overview/Bonuses at bottom) */}
          <div className="lg:col-span-1 order-1 lg:order-1">
            <div className="sticky top-24 space-y-6">
              {/* 四宫格：Logo | 名称+评分+Trust | Withdrawal卡 | SHOW DETAILS */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {/* 左上：Logo */}
                <div className="bg-white border border-[#c7dafd] rounded-xl p-3 flex items-center justify-center aspect-square min-h-0 shadow-sm">
                  <img src={casino.logo} alt={casino.name} className="max-w-full max-h-full object-contain" />
                </div>
                {/* 右上：名称 + 评分 + Trust */}
                <div className="flex flex-col justify-center min-w-0">
                  <h1 className="text-base sm:text-lg font-bold text-[#0f172a] leading-tight">{casino.name} Casino</h1>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <i className="ri-star-fill text-yellow-400 text-xl sm:text-2xl"></i>
                    <span className="text-2xl sm:text-3xl font-bold text-[#0f172a]">{casino.rating}</span>
                  </div>
                  <p className="text-gray-600 text-xs mt-0.5">{casino.trustScoreBy}</p>
                  <p className="text-[#0f172a] font-semibold text-xs mt-0.5">{casino.trustLabel}</p>
                </div>
                {/* 左下：Withdrawal Limit */}
                <div className="bg-white border border-[#c7dafd] rounded-lg px-3 py-2.5 flex flex-col justify-center shadow-sm">
                  <span className="text-gray-600 text-xs">Withdrawal Limit</span>
                  <span className="text-[#0f172a] text-sm font-medium mt-0.5">{casino.withdrawalLimit}</span>
                </div>
                {/* 右下：SHOW DETAILS */}
                <div className="flex flex-col justify-center">
                  <button
                    onClick={() => setShowWithdrawalDetails(!showWithdrawalDetails)}
                    className="text-[#4a9eff] text-xs sm:text-sm font-medium flex items-center gap-1 cursor-pointer hover:underline w-fit"
                  >
                    SHOW DETAILS <i className={`ri-arrow-down-s-line transition-transform ${showWithdrawalDetails ? 'rotate-180' : ''}`}></i>
                  </button>
                </div>
              </div>
              {showWithdrawalDetails && (
                <p className="text-gray-600 text-sm">Withdrawals are processed according to the casino&apos;s policy. Min. threshold may apply. No maximum limit for eligible methods.</p>
              )}

              {/* Pros - card style per reference */}
              <div className="bg-[#f3f8ff] border border-[#c7dafd] rounded-xl p-4">
                <h3 className="text-[#0f172a] font-bold text-lg mb-3">Pros</h3>
                <ul className="space-y-2.5">
                  {casino.pros.map((pro: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-[#0f172a] text-sm">
                      <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-check-line text-green-400 text-sm"></i>
                      </span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons - card style per reference */}
              <div className="bg-[#f3f8ff] border border-[#c7dafd] rounded-xl p-4">
                <h3 className="text-[#0f172a] font-bold text-lg mb-3">Cons</h3>
                <ul className="space-y-2.5">
                  {casino.cons.map((con: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-[#0f172a] text-sm">
                      <span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-close-line text-red-400 text-sm"></i>
                      </span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Games - default 4, SHOW ALL (7) opens popup */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[#0f172a] font-bold uppercase text-sm tracking-wide">Games</h3>
                  <button
                    type="button"
                    onClick={() => setShowGamesPopup(true)}
                    className="text-gray-600 hover:text-[#0f3c96] text-xs uppercase tracking-wide cursor-pointer"
                  >
                    SHOW ALL ({games.length})
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {games.slice(0, GAMES_DEFAULT_COUNT).map((game: any, i: number) => (
                    <div key={i} className="bg-[#f3f8ff] border border-[#c7dafd] rounded-lg p-2 flex flex-col items-center gap-1">
                      {game.icon.startsWith('/') ? (
                        <img src={game.icon} alt="" className="w-8 h-8 object-contain" />
                      ) : (
                        <i className={`${game.icon} text-2xl text-[#3565bf]`}></i>
                      )}
                      <span className="text-gray-700 text-xs text-center leading-tight">{game.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Methods - default 4, SHOW ALL (8) opens popup */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[#0f172a] font-bold uppercase text-sm tracking-wide">Payment Methods</h3>
                  <button
                    type="button"
                    onClick={() => setShowPaymentsPopup(true)}
                    className="text-gray-600 hover:text-[#0f3c96] text-xs uppercase tracking-wide cursor-pointer"
                  >
                    SHOW ALL ({paymentMethods.length})
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {paymentMethods.slice(0, PAYMENTS_DEFAULT_COUNT).map((method: any, i: number) => (
                    <div key={i} className="bg-white rounded-lg p-1.5 flex items-center justify-center min-h-[40px] aspect-[2/1] border border-gray-400">
                      <img src={method.icon} alt={method.name} className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={casino.playNowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-4 bg-gradient-to-r from-[#ff8a00] to-[#ff3d6e] text-white font-bold text-center rounded-xl shadow-[0_10px_24px_rgba(255,75,80,0.45)] hover:opacity-90 transition-all cursor-pointer"
              >
                PLAY NOW
              </a>
            </div>
          </div>

          {/* Right Main Content - Overview / Bonuses tabs (on mobile shows below sidebar) */}
          <div className="lg:col-span-2 order-2 lg:order-2">
            {/* Two tabs: OVERVIEW | BONUSES (?filter=overview | ?filter=bonuses) */}
            <div className="flex border-b border-[#c7dafd] mb-8">
              <Link
                to={`/casino/${formalSlug}`}
                className={`px-6 py-4 font-semibold uppercase text-sm tracking-wide transition-all no-underline ${
                  contentTab === 'overview'
                    ? 'text-[#0f3c96] border-b-2 border-[#1a6fff] -mb-px'
                    : 'text-gray-600 hover:text-[#0f3c96]'
                }`}
              >
                Overview
              </Link>
              <Link
                to={`/casino/${formalSlug}?filter=bonuses`}
                className={`px-6 py-4 font-semibold uppercase text-sm tracking-wide transition-all no-underline ${
                  contentTab === 'bonuses'
                    ? 'text-[#0f3c96] border-b-2 border-[#1a6fff] -mb-px'
                    : 'text-gray-600 hover:text-[#0f3c96]'
                }`}
              >
                Bonuses
              </Link>
            </div>

            {contentTab === 'overview' && (
              <div className="space-y-8">
                {casino.reviewSections.map((section: any, index: number) => (
                  <div key={index} className="border-b border-[#dbe7ff] pb-8 last:border-0">
                    <h2 className="text-xl font-bold text-[#0f172a] mb-4">{section.heading}</h2>
                    <p className="text-gray-700 leading-relaxed">{section.content}</p>
                  </div>
                ))}
              </div>
            )}

            {contentTab === 'bonuses' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {casino.bonuses.map((bonus: any, index: number) => (
                  <BonusCard key={index} bonus={bonus} playNowUrl={casino.playNowUrl} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Games popup - all 7 */}
      {showGamesPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={closeGamesPopup}
          role="dialog"
          aria-modal="true"
          aria-label="All games"
        >
          <div
            className="bg-white border border-[#c7dafd] rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#0f172a] uppercase tracking-wide">Games</h3>
              <button
                type="button"
                onClick={closeGamesPopup}
                className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-[#0f3c96] hover:bg-[#eef4ff] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {games.map((game: any, i: number) => (
                <div key={i} className="bg-[#f3f8ff] border border-[#c7dafd] rounded-lg p-4 flex flex-col items-center gap-2">
                  {game.icon.startsWith('/') ? (
                    <img src={game.icon} alt="" className="w-12 h-12 object-contain" />
                  ) : (
                    <i className={`${game.icon} text-3xl text-[#3565bf]`}></i>
                  )}
                  <span className="text-gray-700 text-sm font-medium text-center">{game.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Payment methods popup - all 8 */}
      {showPaymentsPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={closePaymentsPopup}
          role="dialog"
          aria-modal="true"
          aria-label="All payment methods"
        >
          <div
            className="bg-white border border-[#c7dafd] rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#0f172a] uppercase tracking-wide">Payment Methods</h3>
              <button
                type="button"
                onClick={closePaymentsPopup}
                className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-[#0f3c96] hover:bg-[#eef4ff] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {paymentMethods.map((method: any, i: number) => (
                <div key={i} className="bg-white rounded-lg p-3 flex items-center justify-center min-h-[64px] border border-gray-400">
                  <img src={method.icon} alt={method.name} className="w-full h-8 object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function BonusCard({ bonus, playNowUrl }: { bonus: any; playNowUrl: string }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const rows = [
    { key: 'bonus', label: 'Bonus Requirement', icon: 'ri-gift-line', content: bonus.bonusRequirement },
    { key: 'withdraw', label: 'Withdraw Requirement', icon: 'ri-bank-card-line', content: bonus.withdrawRequirement },
    { key: 'terms', label: 'Term and Condition', icon: 'ri-information-line', content: bonus.termAndCondition },
  ];
  return (
    <div className="bg-white rounded-xl p-6 border border-[#c7dafd] flex flex-col shadow-sm">
      <h3 className="text-lg font-bold text-[#0f172a] mb-4">{bonus.title}</h3>
      <div className="space-y-1 mb-4">
        {rows.map((row) => (
          <div key={row.key}>
            <button
              type="button"
              onClick={() => setExpanded(expanded === row.key ? null : row.key)}
              className="w-full flex items-center justify-between py-2 px-0 text-left text-gray-700 hover:text-[#0f3c96] text-sm cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <i className={`${row.icon} text-[#4a9eff]`}></i>
                {row.label}
              </span>
              <i className={`ri-arrow-right-s-line text-gray-500 transition-transform ${expanded === row.key ? 'rotate-90' : ''}`}></i>
            </button>
            {expanded === row.key && (
              <p className="text-gray-600 text-xs pl-6 pb-2 whitespace-pre-line">{row.content}</p>
            )}
          </div>
        ))}
      </div>
      <a
        href={playNowUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto block w-full py-3 bg-gradient-to-r from-[#ff8a00] to-[#ff3d6e] text-white font-bold text-center rounded-lg text-sm cursor-pointer hover:opacity-90 transition-opacity shadow-[0_10px_24px_rgba(255,75,80,0.45)]"
      >
        CLAIM BONUS
      </a>
    </div>
  );
}
