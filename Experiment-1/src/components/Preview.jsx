function Preview({ text, selectedPlatforms, image }) {
  return (
    <div className="preview">
      <div className="preview-header">
        <div className="avatar">SK</div>

        <div>
          <h4>Sukhraj Kaur</h4>

          <small>
            {selectedPlatforms && selectedPlatforms.length > 0
              ? selectedPlatforms.join(" • ")
              : "No Platform Selected"}{" "}
            • Just now
          </small>
        </div>
      </div>

      <div className="preview-body">
        {text || "Start typing to preview your post..."}
      </div>

      {image && (
        <img
          src={image}
          alt="Post Preview"
          className="preview-image"
        />
      )}

      <div className="preview-actions">
        👍 Like &nbsp;&nbsp;
        💬 Comment &nbsp;&nbsp;
        ↗ Share
      </div>
    </div>
  );
}

export default Preview;