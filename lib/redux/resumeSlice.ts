import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ResumeData {
  templateId: 1 | 2 | 3;
  sections: {
    [key: string]: {
      title: string;
      content: any; // Quill Delta format
    };
  };
  lastModified: string;
}

interface ResumeState {
  currentResumeSlot: 1 | 2 | 3 | null;
  resume1: ResumeData | null;
  resume2: ResumeData | null;
  resume3: ResumeData | null;
  isSaving: boolean;
  lastSaved: string | null;
}

const initialState: ResumeState = {
  currentResumeSlot: null,
  resume1: null,
  resume2: null,
  resume3: null,
  isSaving: false,
  lastSaved: null,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setCurrentSlot: (state, action: PayloadAction<1 | 2 | 3>) => {
      state.currentResumeSlot = action.payload;
    },

    loadResume: (
      state,
      action: PayloadAction<{ slot: 1 | 2 | 3; data: ResumeData }>
    ) => {
      const { slot, data } = action.payload;
      if (slot === 1) state.resume1 = data;
      else if (slot === 2) state.resume2 = data;
      else if (slot === 3) state.resume3 = data;
    },

    updateSection: (
      state,
      action: PayloadAction<{ sectionId: string; content: any }>
    ) => {
      const slot = state.currentResumeSlot;
      if (!slot) return;

      const resume =
        slot === 1 ? state.resume1 : slot === 2 ? state.resume2 : state.resume3;
      if (resume) {
        resume.sections[action.payload.sectionId].content =
          action.payload.content;
        resume.lastModified = new Date().toISOString();
      }
    },

    createNewResume: (
      state,
      action: PayloadAction<{
        slot: 1 | 2 | 3;
        templateId: 1 | 2 | 3;
        sections: any;
      }>
    ) => {
      const { slot, templateId, sections } = action.payload;
      const newResume: ResumeData = {
        templateId,
        sections,
        lastModified: new Date().toISOString(),
      };

      if (slot === 1) state.resume1 = newResume;
      else if (slot === 2) state.resume2 = newResume;
      else if (slot === 3) state.resume3 = newResume;
    },

    setSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
    },

    setSaved: (state) => {
      state.isSaving = false;
      state.lastSaved = new Date().toISOString();
    },
  },
});

export const {
  setCurrentSlot,
  loadResume,
  updateSection,
  createNewResume,
  setSaving,
  setSaved,
} = resumeSlice.actions;

export default resumeSlice.reducer;
