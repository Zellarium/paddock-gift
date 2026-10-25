import { garages as entries } from './data.js';

/** Дополняет короткие записи настройками и создаёт ключи для любого числа гаражей. */
export function prepareGarages(records) {
  const usedIds = new Set();

  return records.map((entry, index) => {
    const author = entry.author?.trim() || 'Твоя команда';
    const baseId = entry.id || entry.author?.trim().toLocaleLowerCase('ru-RU').replace(/\s+/g, '-') || `garage-${index + 1}`;
    let id = baseId;
    let suffix = 2;

    while (usedIds.has(id)) id = `${baseId}-${suffix++}`;
    usedIds.add(id);

    return {
      ...entry,
      id,
      author,
      avatar: entry.avatar || null,
      initials: entry.initials || author.split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase(),
      color: entry.color || '#f34248',
      title: entry.title || 'С днём рождения, Торт!',
      message: entry.message || '',
      photo: entry.photo ?? entry.art ?? null,
    };
  });
}

export const garages = prepareGarages(entries);
