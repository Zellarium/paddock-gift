/** Оставляет место под общий арт и показывает его целиком после добавления файла. */
export default function FinalArt({ src, alt }) {
  if (src) return <figure className="final-art"><img src={src} alt={alt} /></figure>;
  return (
    <div className="final-art final-art-placeholder" role="img" aria-label="Место для финального поздравительного арта">
      <span className="art-corner corner-top" aria-hidden="true" />
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <rect x="9" y="12" width="46" height="40" rx="5" />
        <circle cx="24" cy="25" r="4" />
        <path d="m11 45 13-12 10 9 9-14 10 16" />
      </svg>
      <h2>Здесь будет финальный арт</h2>
      <p>От всей команды — для Торта.</p>
      <span className="art-corner corner-bottom" aria-hidden="true" />
    </div>
  );
}
