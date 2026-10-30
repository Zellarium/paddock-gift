import { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar.jsx";
import ArtGallery, { photoList } from "./ArtGallery.jsx";

function GiftContent({ garage, close }) {
  const [activePhoto, setActivePhoto] = useState(
    () => photoList(garage.photo)[0] || null,
  );

  return (
    <div className="gift-layout" style={{ "--accent": garage.color }}>
      <button
        className="close-button"
        autoFocus
        onClick={close}
        aria-label="Закрыть поздравление"
      >
        ✕
      </button>

      <ArtGallery
        photos={garage.photo}
        author={garage.author}
        alt={garage.photoAlt}
        onSelect={setActivePhoto}
        showDownload={false}
      />

      <div className="gift-copy">
        <div className="gift-copy-content">
          <div className="author-line">
            <Avatar garage={garage} />
            <span>{garage.author}</span>
          </div>

          <h2 id="gift-title">{garage.title}</h2>

          {garage.subtitle && <p className="subtitle">{garage.subtitle}</p>}

          <p className="message">{garage.message}</p>
        </div>

        <div className="gift-actions">
          {activePhoto ? (
            <a className="button" href={activePhoto} download>
              Скачать арт ↓
            </a>
          ) : (
            <button className="button" disabled>
              Скачать арт ↓
            </button>
          )}

          <button className="text-button" onClick={close}>
            Обратно в паддок →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GiftDialog({ garage, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;

    if (garage && !dialog.open) {
      dialog.showModal();
    }

    if (!garage && dialog.open) {
      dialog.close();
    }
  }, [garage]);

  return (
    <dialog
      ref={ref}
      className="gift-dialog"
      aria-labelledby="gift-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          ref.current.close();
        }
      }}
    >
      {garage && (
        <GiftContent
          key={garage.id}
          garage={garage}
          close={() => ref.current.close()}
        />
      )}
    </dialog>
  );
}
