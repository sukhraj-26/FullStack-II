import { useState, useRef } from "react";
import PlatformSelector from "./PlatformSelector";
import Toolbar from "./Toolbar";
import CharacterCounter from "./CharacterCounter";
import Preview from "./Preview";
import DraftList from "./DraftList";
import ValidationMessage from "./ValidationMessage";
import useDrafts from "../hooks/useDrafts";
import { validatePost, platformLimits } from "../utils/validationStrategy";
import EmojiPicker from "emoji-picker-react";
function PostComposer() {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  console.log("Selected Platforms:", selectedPlatforms);

  // Custom Hook
  const { drafts, addDraft, removeDraft } = useDrafts();

  // Save Draft Function
  const handleSave = async () => {
      if (selectedPlatforms.length === 0) {
    alert("Please select at least one platform.");
    return;
  }

  // Validate for every selected platform
     for (const platform of selectedPlatforms) {

    const result = validatePost(platform, text, image);

    if (!result.valid) {
      alert(result.message);
      return;
    }
  }

  // Create the draft
  const draft = {
    id: Date.now(),
    platforms: selectedPlatforms,
    text,
    image,
  };

  // Save it
  await addDraft(draft);

  alert("✅ Draft Saved!");

  // Clear the form
  setText("");
  setImage(null);
  setSelectedPlatforms([]);
  if (fileInputRef.current) {
  fileInputRef.current.value = "";
}
};
 
// Publish Function
const handlePublish = () => {
  if (selectedPlatforms.length === 0) {
    alert("Please select at least one platform.");
    return;
  }

  for (const platform of selectedPlatforms) {
    const result = validatePost(platform, text, image);

    if (!result.valid) {
      alert(result.message);
      return;
    }
  }

  alert("🎉 Post Published Successfully!");

  setText("");
  setImage(null);
  setSelectedPlatforms([]);
  if (fileInputRef.current) {
  fileInputRef.current.value = "";
}

};

  // Edit Draft
  const handleEdit = (draft) => {
    setSelectedPlatforms(draft.platforms);
    setText(draft.text);
    setImage(draft.image || null);


    // Remove the old draft so the edited one can be saved again
    removeDraft(draft.id);
  };

  return (
    <div className="composer">

     <PlatformSelector
       selectedPlatforms={selectedPlatforms}
       setSelectedPlatforms={setSelectedPlatforms}
     />

      <textarea
        placeholder="Share your thoughts, ideas, or achievements..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
     <input
  ref={fileInputRef}
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Allow images up to 5 MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5 MB.");
      return;
    }

    setImage(URL.createObjectURL(file));
  }}
/>

<div className="toolbar-container">
  <button
    className="emoji-btn"
    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
  >
    😊
  </button>

  <Toolbar />

  {showEmojiPicker && (
    <div className="emoji-picker">
      <EmojiPicker
        width={320}
        height={400}
        onEmojiClick={(emojiData) => {
          setText((prev) => prev + emojiData.emoji);
          setShowEmojiPicker(false);
        }}
      />
    </div>
  )}
</div>

{selectedPlatforms.map((platform) => (
  <CharacterCounter
    key={platform}
    text={text}
    platform={platform}
    limit={platformLimits[platform]}
  />
))}

   <ValidationMessage
    text={text}
    selectedPlatforms={selectedPlatforms}
/>
   

      <div className="buttons">
        <button onClick={handleSave}>
          💾 Save Draft
        </button>

       <button
  onClick={handlePublish}
  disabled={!text.trim() && !image}
>
  🚀 Publish
</button>
      </div>
      

      <Preview
        text={text}
        selectedPlatforms={selectedPlatforms}
        image={image}
      />

      <DraftList
        drafts={drafts}
        onDelete={removeDraft}
        onEdit={handleEdit}
      />

    </div>
  );
}

export default PostComposer;