import GarageCard from "../components/GarageCard.jsx";
import { garages } from "../garageData.js";

/** Представляет подарок и приглашает перейти к гаражам друзей. */
export default function WelcomePage({ headingRef, hasVisited, onEnter }) {
  return (
    <main className="welcome page-width">
      <div className="welcome-copy">
        <h1 ref={headingRef} tabIndex={-1}>
          Сегодня
          <br />
          всё <em>для тебя!</em>
        </h1>
        <p>
          Мы собрали свою команду KAMAZ MASTERS, где собрались лучшие инженеры
          (художники). Каждый в своём гараже мастерит уникальный подарок, чтобы
          выиграть эту гонку жизни!
        </p>
        <button className="button primary" onClick={onEnter}>
          {hasVisited ? "Вернуться в паддок" : "Войти в паддок"}{" "}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
      <div className="welcome-visual">
        {garages[0] && (
          <GarageCard
            garage={garages[0]}
            showDetails={false}
            doorLabel="Войти в паддок"
            onOpen={onEnter}
          />
        )}
        <div className="welcome-note">
          С любовью,
          <br />
          <strong>Команда KAMAZ MASTERS</strong>
          <span aria-hidden="true">✦</span>
        </div>
      </div>
    </main>
  );
}
