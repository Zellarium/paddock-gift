import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/a11y';
import GarageCard from './GarageCard.jsx';
import { garages } from '../garageData.js';

/** Показывает по одному гаражу и переключает его стрелками, свайпом или колёсиком. */
export default function GarageCarousel({ visited, opening, gift, activeIndex, setActiveIndex, openGarage }) {
  const swiper = useRef(null);
  const [edges, setEdges] = useState({ start: activeIndex === 0, end: activeIndex === garages.length - 1 });
  const blocked = Boolean(opening || gift);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const instance = swiper.current;
    if (instance && !instance.destroyed && instance.activeIndex !== activeIndex) instance.slideTo(activeIndex);
  }, [activeIndex]);

  /** Обновляет доступность стрелок и сохраняет положение карусели при смене экрана. */
  function update(instance) {
    const focusedSlide = document.activeElement?.closest('.swiper-slide');
    if (focusedSlide && instance.el.contains(focusedSlide) && focusedSlide !== instance.slides[instance.activeIndex]) {
      instance.el.focus({ preventScroll: true });
    }
    setEdges({ start: instance.isBeginning, end: instance.isEnd });
    setActiveIndex(instance.activeIndex);
  }

  if (!garages.length) return <p className="empty-paddock">Здесь скоро появятся поздравления друзей.</p>;

  return (
    <section className="carousel-shell" aria-label="Гаражи друзей">
      <button className="carousel-arrow previous" disabled={edges.start || blocked} onClick={() => swiper.current?.slidePrev()} aria-label="Предыдущий гараж">←</button>
      <div className="garage-viewport">
        <Swiper
          tabIndex={-1}
          modules={[A11y, Keyboard, Mousewheel]}
          slidesPerView={1} slidesPerGroup={1} spaceBetween={32} initialSlide={activeIndex}
          speed={reducedMotion ? 0 : 450}
          allowTouchMove={!blocked} allowSlideNext={!blocked} allowSlidePrev={!blocked}
          keyboard={{ enabled: !blocked, onlyInViewport: true }}
          mousewheel={{ enabled: !blocked, releaseOnEdges: true, thresholdDelta: 24, thresholdTime: 450 }}
          a11y={{
            containerMessage: 'Гаражи друзей', containerRoleDescriptionMessage: 'Карусель',
            itemRoleDescriptionMessage: 'Гараж', slideLabelMessage: 'Поздравление от друга',
            firstSlideMessage: 'Первый гараж', lastSlideMessage: 'Последний гараж',
          }}
          onSwiper={instance => { swiper.current = instance; update(instance); }}
          onSlideChange={update} onResize={update}
        >
          {garages.map((garage, index) => (
            <SwiperSlide key={garage.id} aria-hidden={index !== activeIndex}>
              <GarageCard
                garage={garage} visited={visited.includes(garage.id)} opening={opening === garage.id}
                disabled={Boolean(opening)} isActive={index === activeIndex}
                onOpen={event => openGarage(garage, event.currentTarget)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button className="carousel-arrow next" disabled={edges.end || blocked} onClick={() => swiper.current?.slideNext()} aria-label="Следующий гараж">→</button>
    </section>
  );
}
