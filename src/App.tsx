import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import Navbar from './components/feature/Navbar';
import ScrollToTop from './components/feature/ScrollToTop';
import WelcomePopup from './components/feature/WelcomePopup';

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      {/* Full-site background: white gradient */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(180deg,#ffffff_0%,#f2f7ff_46%,#eaf2ff_100%)]" aria-hidden />
      <div className="relative z-10 min-h-screen">
        <WelcomePopup />
        <ScrollToTop />
        <Navbar />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;