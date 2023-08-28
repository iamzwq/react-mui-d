import { usePreferenceStore } from "~/stores";

const preference = usePreferenceStore.getState().preference;

const getPreference = ({ page, key }: { page: string; key: string }) => {
  const p = preference.find(item => item.preference === key && item.page === page);
  return p ? p.value : "";
};

export default getPreference;
