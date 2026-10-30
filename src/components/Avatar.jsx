import { useState } from "react";

export default function Avatar({ garage }) {
  const [failedSrc, setFailedSrc] = useState(null);

  const hasAvatar = Boolean(garage.avatar && garage.avatar !== failedSrc);

  return (
    <span className="avatar" style={{ "--accent": garage.color }}>
      {hasAvatar ? (
        <img
          src={garage.avatar}
          alt=""
          onError={() => setFailedSrc(garage.avatar)}
        />
      ) : (
        garage.initials
      )}
    </span>
  );
}
