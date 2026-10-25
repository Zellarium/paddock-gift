import Avatar from '../components/Avatar.jsx';
import FinalArt from '../components/FinalArt.jsx';
import { site } from '../data.js';
import { garages } from '../garageData.js';

/** Завершает подарок общим артом и поздравлением команды. */
export default function PodiumPage({ headingRef, onBack }) {
  return (
    <main className="podium-page page-width">
      <h1 ref={headingRef} tabIndex={-1}>С днём рождения, <em>Торт!</em></h1>
      <p className="podium-message">Пусть рядом всегда будет команда, с которой любой поворот — начало хорошей истории.</p>
      <FinalArt src={site.finalArt} alt={site.finalArtAlt} />
      <div className="team-line">{garages.map(garage => <span key={garage.id}><Avatar garage={garage} />{garage.author}</span>)}</div>
      <button className="button" onClick={onBack}>Вернуться к подаркам <span aria-hidden="true">↗</span></button>
    </main>
  );
}
