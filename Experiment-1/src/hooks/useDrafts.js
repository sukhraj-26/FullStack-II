import { useEffect, useState } from "react";
import * as api from "../utils/mockApi";

export default function useDrafts() {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    loadDrafts();
  }, []);

  async function loadDrafts() {
    const data = await api.getDrafts();
    setDrafts(data);
  }

  async function addDraft(draft) {
    await api.saveDraft(draft);
    loadDrafts();
  }

  async function removeDraft(id) {
    await api.deleteDraft(id);
    loadDrafts();
  }

  async function editDraft(draft) {
    await api.updateDraft(draft);
    loadDrafts();
  }

  return {
    drafts,
    addDraft,
    removeDraft,
    editDraft,
  };
}