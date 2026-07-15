function CharacterCounter({ text, platform, limit }) {
  const remaining = limit - text.length;

  let color = "green";

  if (remaining < 50) color = "orange";

  if (remaining < 0) color = "red";

  return (
    <div
      style={{
        color,
        marginBottom: "10px",
      }}
    >
      <strong>{platform}</strong>

      <br />

      {text.length} / {limit}

      <br />

      Remaining : {remaining}
    </div>
  );
}

export default CharacterCounter;