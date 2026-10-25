import { useEffect, useRef, useState } from 'react';
import Avatar from './Avatar.jsx';
import PhotoPlaceholder from './PhotoPlaceholder.jsx';

/** Показывает фотографию или заглушку и личное поздравление. */
export default function GiftDialog({ garage, onClose }) {
  const ref = useRef(null);
  const [failedPhoto, setFailedPhoto] = useState(null);
  const hasPhoto = Boolean(garage?.photo && garage.photo !== failedPhoto);
  useEffect(() => {
    if (garage && !ref.current.open) ref.current.showModal();
    if (!garage && ref.current.open) ref.current.close();
  }, [garage]);

  return (
    <dialog
      ref={ref} className="gift-dialog" aria-labelledby="gift-title" onClose={onClose}
      onClick={event => { if (event.target === event.currentTarget) ref.current.close(); }}
    >
      {garage && (
        <div className="gift-layout" style={{ '--accent': garage.color }}>
          <button className="close-button" autoFocus onClick={() => ref.current.close()} aria-label="Закрыть поздравление">✕</button>
          <div className="gift-art">
            {hasPhoto ? (
              <img
                src={garage.photo}
                alt={garage.photoAlt || `Фото к поздравлению: ${garage.author}`}
                onError={() => setFailedPhoto(garage.photo)}
              />
            ) : <PhotoPlaceholder author={garage.author} />}
          </div>
          <div className="gift-copy">
            <div className="author-line"><Avatar garage={garage} /><span>{garage.author}</span></div>
            <h2 id="gift-title">{garage.title}</h2>
            {garage.subtitle && <p className="subtitle">{garage.subtitle}</p>}
            <p className="message">{garage.message}</p>
            <div className="gift-actions">
              {hasPhoto && <a className="button" href={garage.photo} download>Скачать фото ↓</a>}
              <button className="text-button" onClick={() => ref.current.close()}>Обратно в паддок →</button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
