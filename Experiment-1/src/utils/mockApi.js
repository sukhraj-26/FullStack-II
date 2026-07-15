const STORAGE_KEY = "flowpost_drafts";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getDrafts = async () => {
  await delay(300);

  const drafts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return drafts;
};

export const saveDraft = async (draft) => {
  await delay(300);

  const drafts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  drafts.unshift(draft);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));

  return draft;
};

export const deleteDraft = async (id) => {
  await delay(300);

  const drafts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const updated = drafts.filter((draft) => draft.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return updated;
};

export const updateDraft = async (updatedDraft) => {
  await delay(300);

  const drafts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const updated = drafts.map((draft) =>
    draft.id === updatedDraft.id ? updatedDraft : draft
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return updatedDraft;
};