
import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LuckyRooLogo from './LuckyRooLogo';
import { getAllCasinoSlugs, getCasinoBySlug } from '../../pages/casino-review/casinoData';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const casinoList = useMemo(() => {
    return getAllCasinoSlugs()
      .map((slug) => {
        const c = getCasinoBySlug(slug);
        return c ? { slug: c.slug, name: c.name } : null;
      })
      .filter((x): x is { slug: string; name: string } => x != null);
  }, []);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return casinoList.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q)
    );
  }, [casinoList, searchQuery]);

  const goToCasino = (slug: string) => {
    navigate(`/casino/${slug}-casino`);
    setSearchQuery('');
    setIsSearchOpen(false);
    setIsMenuOpen(false);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      e.preventDefault();
      goToCasino(searchResults[0].slug);
    }
  };

  return (
    <nav className="bg-[#232323] border-b border-[#1a6fff]/20 sticky top-0 z-50 shadow-[0_2px_20px_rgba(26,111,255,0.15)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white text-2xl cursor-pointer"
          >
            <i className="ri-menu-line"></i>
          </button>

          <LuckyRooLogo size="md" />

          <button
            onClick={() => { setIsSearchOpen(!isSearchOpen); setIsMenuOpen(false); }}
            className="md:hidden text-white text-xl cursor-pointer"
            aria-label="Search"
          >
            <i className="ri-search-line"></i>
          </button>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors text-md">
              Home
            </Link>
            <Link to="/australia-online-casinos" className="text-gray-300 hover:text-white transition-colors text-md">
              Online Casinos
            </Link>
            <Link to="/australia-casino-bonuses" className="text-gray-300 hover:text-white transition-colors text-md">
              Bonuses
            </Link>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-300 hover:text-white transition-colors text-xl cursor-pointer"
            >
              <i className="ri-search-line"></i>
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="py-4 border-t border-[#1a6fff]/20">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search Casinos"
                className="w-full bg-[#1A1A1A] text-white px-4 py-2 pr-10 rounded-lg border border-[#1a6fff]/20 focus:outline-none focus:ring-2 focus:ring-[#1a6fff]/50 text-sm placeholder-gray-500"
                autoFocus
              />
              <i className="ri-search-line absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"></i>
              {searchQuery.trim() && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-[#252525] border border-[#1a6fff]/20 rounded-lg shadow-xl max-h-60 overflow-y-auto z-50">
                  {searchResults.length === 0 ? (
                    <p className="px-4 py-3 text-gray-400 text-sm">No casinos found</p>
                  ) : (
                    searchResults.map((c) => (
                      <button
                        key={c.slug}
                        type="button"
                        onClick={() => goToCasino(c.slug)}
                        className="w-full px-4 py-3 text-left text-white text-sm hover:bg-[#1a6fff]/20 transition-colors flex items-center justify-between"
                      >
                        <span>{c.name} Casino</span>
                        <i className="ri-arrow-right-s-line text-gray-500"></i>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#1a6fff]/20">
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/australia-online-casinos" className="text-gray-300 hover:text-white transition-colors text-sm" onClick={() => setIsMenuOpen(false)}>
                Online Casinos
              </Link>
              <Link to="/australia-casino-bonuses" className="text-gray-300 hover:text-white transition-colors text-sm" onClick={() => setIsMenuOpen(false)}>
                Bonuses
              </Link>
              <button
                type="button"
                onClick={() => { setIsSearchOpen(true); setIsMenuOpen(false); }}
                className="text-left text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2"
              >
                <i className="ri-search-line"></i> Search Casinos
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
