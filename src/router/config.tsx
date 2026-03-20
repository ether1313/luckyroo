import { lazy } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/page'));
const OnlineCasinosPage = lazy(() => import('../pages/online-casinos/page'));
const BonusesPage = lazy(() => import('../pages/bonuses/page'));
const CasinoReviewPage = lazy(() => import('../pages/casino-review/page'));

function RedirectCasinoReviewsToCasino() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/casino/${slug}-casino`} replace />;
}
function RedirectCasinoReviewsBonusesToCasino() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/casino/${slug}-casino?filter=bonuses`} replace />;
}

const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/australia-online-casinos', element: <OnlineCasinosPage /> },
  { path: '/australia-casino-bonuses', element: <BonusesPage /> },
  { path: '/casino/:slug', element: <CasinoReviewPage /> },
  // SEO: redirect old paths to formal slug URLs
  { path: '/online-casinos', element: <Navigate to="/australia-online-casinos" replace /> },
  { path: '/bonuses', element: <Navigate to="/australia-casino-bonuses" replace /> },
  { path: '/casino-reviews/:slug/bonuses', element: <RedirectCasinoReviewsBonusesToCasino /> },
  { path: '/casino-reviews/:slug', element: <RedirectCasinoReviewsToCasino /> },
  { path: '*', element: <Navigate to="/" replace /> },
];

export default routes;