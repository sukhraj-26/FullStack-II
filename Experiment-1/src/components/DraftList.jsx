import DraftItem from "./DraftItem";

function DraftList({ drafts, onDelete, onEdit }) {
  if (drafts.length === 0) {
    return (
      <div className="drafts">
        <h3>📂 Saved Drafts</h3>
        <p>No drafts yet.</p>
      </div>
    );
  }

  return (
    <div className="drafts">
      <h3>📂 Saved Drafts</h3>

      {drafts.map((draft) => (
        <DraftItem
          key={draft.id}
          draft={draft}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default DraftList;