import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTop } from '../../utils/scroll';

/**
 * On route change (e.g. navbar Home / Online Casinos / Bonuses), smoothly scroll to top
 * so the new page content is visible without a full reload.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop({ behavior: 'smooth' });
  }, [pathname]);

  return null;
}
