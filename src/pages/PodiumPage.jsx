import { useState } from "react";

import Avatar from "../components/Avatar.jsx";
import FinalArt from "../components/FinalArt.jsx";

import ArtGallery, { photoList } from "../components/ArtGallery.jsx";

import { site, podium } from "../data.js";

import { garages, prepareGarages } from "../garageData.js";

const author = prepareGarages([podium])[0];

const photos = photoList(podium.photo ?? site.finalArt);

const others = garages.filter(
  (garage) =>
    garage.author.trim().toLocaleLowerCase("ru-RU") !==
    author.author.trim().toLocaleLowerCase("ru-RU"),
);

export default function PodiumPage({ headingRef, onBack }) {
  const [activePhoto, setActivePhoto] = useState(() => photos[0] || null);

  return (
    <main className="podium-page page-width">
      <div className="podium-intro">
        <h1 ref={headingRef} tabIndex={-1}>
          С днём рождения, <em>Торт!</em>
        </h1>

        <p className="podium-message">
          Пусть рядом всегда будет команда, с которой любой поворот не страшен!
        </p>
      </div>

      <div className="podium-content">
        <div className="podium-art" style={{ "--accent": author.color }}>
          {photos.length > 0 ? (
            <ArtGallery
              photos={photos}
              author={author.author}
              alt={site.finalArtAlt}
              onSelect={setActivePhoto}
              showDownload={false}
            />
          ) : (
            <FinalArt src={null} alt={site.finalArtAlt} />
          )}
        </div>

        <section className="podium-author" style={{ "--accent": author.color }}>
          <div className="podium-author-content">
            <div className="author-line">
              <Avatar garage={author} />
              <h2>{author.author}</h2>
            </div>

            {podium.title && <h3>{podium.title}</h3>}

            <p className="message">{author.message}</p>
          </div>

          <div className="podium-download">
            {activePhoto ? (
              <a className="button" href={activePhoto} download>
                Скачать арт ↓
              </a>
            ) : (
              <button className="button" disabled>
                Скачать арт ↓
              </button>
            )}
          </div>
        </section>
      </div>

      <div className="team-line" aria-label="Остальные участники поздравления">
        {others.map((garage) => (
          <span key={garage.id}>
            <Avatar garage={garage} />
            {garage.author}
          </span>
        ))}
      </div>

      <button className="button podium-back" onClick={onBack}>
        Вернуться к подаркам
        <span aria-hidden="true">↗</span>
      </button>
    </main>
  );
}
