import { create } from "zustand";
import { defaultSortBy } from "~/constants/home";
import { sort_by_selected_preference } from "~/constants/preference";
import getPreference from "~/utils/getPreference";

type State = {
  currFilter: any;
  filterTree: any[];
  currSortBy: any;
};

type Actions = {
  setCurrFilter: (currFilter: any) => void;
  setFilterTree: (filterTree: any[]) => void;
  setCurrSortBy: (currSortBy: any) => void;
};

const sortByPreferValue = getPreference(sort_by_selected_preference);
const sortByObj = JSON.parse(sortByPreferValue || "{}");
const initialSortBy = sortByObj.sort_column?.column ? sortByObj : defaultSortBy;

const useHomeStore = create<State & Actions>()(set => ({
  currFilter: null,
  setCurrFilter: currFilter => set(() => ({ currFilter })),
  filterTree: [],
  setFilterTree: filterTree => set(() => ({ filterTree })),
  currSortBy: initialSortBy,
  setCurrSortBy: currSortBy => set(() => ({ currSortBy }))
}));

export default useHomeStore;
