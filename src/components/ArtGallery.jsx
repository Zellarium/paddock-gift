import { useEffect, useRef, useState } from "react";
import PhotoPlaceholder from "./PhotoPlaceholder.jsx";

export function photoList(value) {
  const items = Array.isArray(value) ? value : [value];

  return [
    ...new Set(
      items
        .filter((item) => typeof item === "string" && item.trim())
        .map((item) => item.trim()),
    ),
  ];
}

export default function ArtGallery({
  photos,
  author,
  alt,
  onSelect,
  showDownload = true,
}) {
  const images = photoList(photos);

  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState({});

  const touch = useRef(null);

  const current = Math.min(index, Math.max(images.length - 1, 0));

  const src = images[current];
  const selectedSrc = src && !failed[src] ? src : null;

  useEffect(() => {
    onSelect?.(selectedSrc);
  }, [selectedSrc, onSelect]);

  function move(step) {
    setIndex(Math.max(0, Math.min(images.length - 1, current + step)));
  }

  return (
    <div
      className="art-gallery"
      role="group"
      aria-label={`Арты: ${author}`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          event.stopPropagation();

          move(event.key === "ArrowRight" ? 1 : -1);
        }
      }}
    >
      <div
        className="art-gallery-stage"
        onTouchStart={(event) => {
          const point = event.touches[0];

          touch.current = {
            x: point.clientX,
            y: point.clientY,
          };
        }}
        onTouchEnd={(event) => {
          if (!touch.current) return;

          const point = event.changedTouches[0];
          const dx = point.clientX - touch.current.x;
          const dy = point.clientY - touch.current.y;

          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
            move(dx < 0 ? 1 : -1);
          }

          touch.current = null;
        }}
        onTouchCancel={() => {
          touch.current = null;
        }}
      >
        {selectedSrc ? (
          <img
            key={src}
            src={src}
            alt={alt || `Арт к поздравлению: ${author}`}
            draggable={false}
            onError={() => {
              setFailed((previous) => ({
                ...previous,
                [src]: true,
              }));
            }}
          />
        ) : (
          <PhotoPlaceholder author={author} />
        )}
      </div>

      {(images.length > 1 || (showDownload && selectedSrc)) && (
        <div className="art-gallery-controls">
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => move(-1)}
                disabled={current === 0}
                aria-label="Предыдущий арт"
              >
                ←
              </button>

              <span aria-live="polite" aria-atomic="true">
                {current + 1} / {images.length}
              </span>

              <button
                type="button"
                onClick={() => move(1)}
                disabled={current === images.length - 1}
                aria-label="Следующий арт"
              >
                →
              </button>
            </>
          )}

          {showDownload && selectedSrc && (
            <a href={selectedSrc} download>
              Скачать арт ↓
            </a>
          )}
        </div>
      )}
    </div>
  );
}
