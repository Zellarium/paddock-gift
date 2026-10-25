import GarageCard from '../components/GarageCard.jsx';
import { garages } from '../garageData.js';

/** Представляет подарок и приглашает перейти к гаражам друзей. */
export default function WelcomePage({ headingRef, hasVisited, onEnter }) {
  return (
    <main className="welcome page-width">
      <div className="welcome-copy">
        <h1 ref={headingRef} tabIndex={-1}>Сегодня<br />всё <em>для тебя.</em></h1>
        <p>Мы собрали свою команду. В каждом гараже — фото, немного тепла и поздравление от одного из нас.</p>
        <button className="button primary" onClick={onEnter}>{hasVisited ? 'Вернуться в паддок' : 'Войти в паддок'} <span aria-hidden="true">↗</span></button>
      </div>
      <div className="welcome-visual">
        {garages[0] && <GarageCard garage={garages[0]} showDetails={false} doorLabel="Войти в паддок" onOpen={onEnter} />}
        <div className="welcome-note">С любовью,<br /><strong>твои друзья.</strong><span aria-hidden="true">✦</span></div>
      </div>
    </main>
  );
}
