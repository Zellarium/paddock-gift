import Avatar from './Avatar.jsx';

/** Собирает гараж из фасада, аватарки и отдельного слоя поднимающихся ворот. */
export default function GarageCard({
  garage, visited = false, opening = false, disabled = false,
  isActive = true, showDetails = true, doorLabel, onOpen,
}) {
  return (
    <article className="garage-card" style={{ '--accent': garage.color }}>
      <div className={`garage-scene ${visited || opening ? 'is-open' : ''}`}>
        {garage.facade ? <img className="facade" src={garage.facade} alt="" /> : (
          <div className="building"><div className="roof" /><span className="wall-line" /></div>
        )}
        <div className="garage-sign"><Avatar garage={garage} /><span>{garage.author}</span></div>
        <button
          className="garage-opening" disabled={disabled} tabIndex={isActive ? 0 : -1} onClick={onOpen}
          aria-label={doorLabel || `${visited ? 'Ещё раз посмотреть' : 'Открыть'} поздравление: ${garage.author}`}
          aria-busy={opening}
        >
          <span className="garage-inside"><span>✦</span><small>{opening ? 'Открываем…' : 'Посмотреть подарок'}</small></span>
          <span className="shutter">
            {garage.door && <img src={garage.door} alt="" />}
            <span className="door-label">{opening ? 'Открываем…' : doorLabel || 'Открыть гараж'}<b aria-hidden="true">↑</b></span>
          </span>
        </button>
        <span className="garage-curb" />
      </div>
      {showDetails && (
        <div className="garage-caption">
          <h2>{garage.author}</h2>
          {visited && <span className="seen-mark">✓ Просмотрено</span>}
        </div>
      )}
    </article>
  );
}
