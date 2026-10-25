import { useEffect, useRef, useState } from 'react';
import { garages } from '../garageData.js';

const STORAGE_KEY = 'paddock-gift:v1';

/** Восстанавливает только существующие гаражи, сохраняя совместимость с первой версией. */
function readVisited() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(value)
      ? [...new Set(value.filter(id => garages.some(garage => garage.id === id)))]
      : [];
  } catch {
    return [];
  }
}

/** Хранит просмотренные подарки, выбранный гараж и состояние открывания. */
export default function usePaddock() {
  const [visited, setVisited] = useState(readVisited);
  const [activeIndex, setActiveIndex] = useState(0);
  const [opening, setOpening] = useState(null);
  const [gift, setGift] = useState(null);
  const timer = useRef(null);
  const trigger = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(visited));
    } catch {}
  }, [visited]);

  useEffect(() => () => clearTimeout(timer.current), []);

  /** Поднимает ворота перед первым просмотром и сразу открывает повторный подарок. */
  function openGarage(garage, element) {
    if (opening || gift) return;
    trigger.current = element;
    setOpening(garage.id);
    const instant = visited.includes(garage.id)
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    timer.current = setTimeout(() => {
      setVisited(current => current.includes(garage.id) ? current : [...current, garage.id]);
      setGift(garage);
      setOpening(null);
    }, instant ? 0 : 720);
  }

  /** Возвращает фокус на открывшие поздравление ворота. */
  function closeGift() {
    setGift(null);
    requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }));
  }

  /** Очищает прогресс этого подарка и возвращает карусель к началу. */
  function reset() {
    clearTimeout(timer.current);
    setOpening(null);
    setGift(null);
    setVisited([]);
    setActiveIndex(0);
  }

  return {
    visited, activeIndex, setActiveIndex, opening, gift,
    complete: garages.length > 0 && garages.every(garage => visited.includes(garage.id)),
    openGarage, closeGift, reset,
  };
}
