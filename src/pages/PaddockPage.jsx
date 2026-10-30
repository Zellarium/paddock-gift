import GarageCarousel from "../components/GarageCarousel.jsx";

export default function PaddockPage({
  headingRef,
  complete,
  reset,
  onPodium,
  ...carousel
}) {
  return (
    <main className="paddock page-width">
      <div className="paddock-intro">
        <h1 ref={headingRef} tabIndex={-1}>
          Команда <em>собралась)</em>
        </h1>

        <p>
          Листай гаражи и открывай ворота. За ними тебя уже ждут наши ВЕЛИЧАЙШИЕ
          ИНЖЕНЕРЫ
        </p>
      </div>

      <div className="paddock-carousel-area">
        <GarageCarousel {...carousel} />
      </div>

      <div className="paddock-actions">
        <button
          className="button primary"
          disabled={!complete || Boolean(carousel.opening)}
          onClick={onPodium}
          aria-describedby="podium-hint"
        >
          На подиум
          <span aria-hidden="true">↗</span>
        </button>

        <button className="reset-button" onClick={reset}>
          Сбросить просмотренные подарки
        </button>

        <p className="podium-hint" id="podium-hint" role="status">
          {complete
            ? "Все поздравления открыты. ПОДИУМ ЖДЕТ!!!"
            : "Открой поздравления всех друзей, чтобы выиграть заезд!"}
        </p>
      </div>
    </main>
  );
}
