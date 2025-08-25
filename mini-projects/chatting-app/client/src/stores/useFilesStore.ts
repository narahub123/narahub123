import { create } from "zustand";
import { FileInfo, FilesState } from "../types";

export const useFilesStore = create<FilesState>((set) => ({
  files: [],
  setFile: (file: FileInfo) =>
    set((state) => ({
      files: [...state.files, file],
    })),
  clearFiles: () =>
    set(() => ({
      files: [],
    })),
  deleteFile: (index: number) =>
    set((state) => ({
      files: state.files.filter((f, idx) => idx !== index),
    })),
}));
