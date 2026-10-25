/** Показывает аватар автора или инициалы, пока изображения нет. */
export default function Avatar({ garage }) {
  return (
    <span className="avatar" style={{ '--accent': garage.color }}>
      {garage.avatar ? <img src={garage.avatar} alt="" /> : garage.initials}
    </span>
  );
}
