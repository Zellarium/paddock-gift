/** Показывает место для иконки и поздравление по центру шапки. */
export default function Header({ icon, disabled, onHome }) {
  return (
    <header className="site-header">
      <div className="header-content">
        <button
          className="header-icon"
          disabled={disabled}
          onClick={onHome}
          aria-label="На стартовый экран"
        >
          {icon ? (
            <img src={icon} alt="" />
          ) : (
            <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path d="M8 29h24M11 29V18h18v11M10 18h20M14 18v-4m6 4v-4m6 4v-4" />
              <path d="m14 10 1-3m5 3 1-3m5 3 1-3" />
            </svg>
          )}
        </button>
        <p className="header-greeting">Торт, это гонка всей твоей жизни!!!</p>
        <span className="header-balance" aria-hidden="true" />
      </div>
      <div className="checkered-strip" aria-hidden="true" />
    </header>
  );
}
