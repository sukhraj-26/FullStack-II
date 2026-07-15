function DraftItem({ draft, onDelete, onEdit }) {
  return (
    <div className="draft-item">

      <h4>
        {draft.platforms.join(" • ")}
      </h4>

      <p>{draft.text}</p>

      {draft.image && (
        <img
          src={draft.image}
          alt="Draft Preview"
          className="draft-image"
        />
      )}

      <div className="buttons">
        <button onClick={() => onEdit(draft)}>
          ✏️ Edit
        </button>

        <button onClick={() => onDelete(draft.id)}>
          🗑️ Delete
        </button>
      </div>

    </div>
  );
}

export default DraftItem;