import { create } from "zustand";
import { AlertColor } from "@mui/material";

type SnackBar = {
  vertical?: "top" | "bottom";
  horizontal?: "left" | "center" | "right";
  message: string;
  open: boolean;
  severity?: AlertColor;
};

type State = {
  snackBar: SnackBar;
  searchText: string;
};

type Actions = {
  setSnackBar: (snackBar: SnackBar) => void;
  resetSnackBar: () => void;
  setSearchText: (searchText: string) => void;
};

const initSnackBar: SnackBar = {
  message: "",
  open: false
};

const useGlobalStore = create<State & Actions>()(set => ({
  snackBar: initSnackBar,
  setSnackBar: snackBar => set(() => ({ snackBar })),
  resetSnackBar: () => set(() => ({ snackBar: initSnackBar })),
  searchText: "",
  setSearchText: searchText => set({ searchText })
}));

export default useGlobalStore;
