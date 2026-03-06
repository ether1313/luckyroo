import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import Navbar from './components/feature/Navbar';
import ScrollToTop from './components/feature/ScrollToTop';

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      {/* Full-site background: dice image + black overlay */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${(__BASE_PATH__ || '/').replace(/\/$/, '')}/website-bg.png)` }}
        aria-hidden
      />
      <div className="fixed inset-0 z-[1] bg-black/75" aria-hidden />
      <div className="relative z-10 min-h-screen">
        <ScrollToTop />
        <Navbar />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;