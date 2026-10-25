import { useEffect, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import GiftDialog from './components/GiftDialog.jsx';
import WelcomePage from './pages/WelcomePage.jsx';
import PaddockPage from './pages/PaddockPage.jsx';
import PodiumPage from './pages/PodiumPage.jsx';
import usePaddock from './hooks/usePaddock.js';
import { site } from './data.js';

/** Переключает экраны и связывает их с общим состоянием подарков. */
export default function App() {
  const [view, setView] = useState('welcome');
  const heading = useRef(null);
  const paddock = usePaddock();

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [view]);

  return (
    <div className={`app-shell view-${view}`}>
      <Header
        icon={site.headerIcon}
        disabled={Boolean(paddock.opening)}
        onHome={() => setView('welcome')}
      />
      {view === 'welcome' && (
        <WelcomePage headingRef={heading} hasVisited={paddock.visited.length > 0} onEnter={() => setView('paddock')} />
      )}
      {view === 'paddock' && (
        <PaddockPage headingRef={heading} {...paddock} onPodium={() => setView('podium')} />
      )}
      {view === 'podium' && (
        <PodiumPage headingRef={heading} onBack={() => setView('paddock')} />
      )}
      <Footer />
      <GiftDialog garage={paddock.gift} onClose={paddock.closeGift} />
    </div>
  );
}
