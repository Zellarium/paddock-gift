/** Показывает место для фотографии, пока файл не добавлен или недоступен. */
export default function PhotoPlaceholder({ author }) {
  return (
    <div className="photo-placeholder" role="img" aria-label={`Место для фото к поздравлению: ${author}`}>
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <rect x="8" y="12" width="48" height="40" rx="5" />
        <circle cx="24" cy="25" r="4" />
        <path d="m10 45 13-12 10 9 10-14 11 16" />
      </svg>
      <strong>Здесь будет фото</strong>
      <span>{author}</span>
    </div>
  );
}
