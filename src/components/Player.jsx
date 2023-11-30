import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onSavePlayer,
}) {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    if (isEditing) {
      onSavePlayer(symbol, name);
    }
    setIsEditing((previousIsEditing) => !previousIsEditing);
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing && <span className="player-name">{name}</span>}
        {isEditing && (
          <input type="text" required value={name} onChange={handleChange} />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
