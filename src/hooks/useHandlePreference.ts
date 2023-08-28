import { useCallback } from "react";
import { useDebounceFn } from "ahooks";
import { preferenceApi } from "~/api";
import { usePreferenceStore, useSessionStore } from "~/stores";

interface Params {
  page: string;
  key: string;
}

const useHandlePreference = ({ page, key }: Params) => {
  const session = useSessionStore(state => state.session);

  const preference = usePreferenceStore(state => state.preference);
  const setPreference = usePreferenceStore(state => state.setPreference);

  const exsit = preference.find(item => item.page === page && item.preference === key);

  const save = useCallback(
    async (value: string) => {
      if (exsit && exsit.value === value) return;

      const result = await preferenceApi.fetchPreference({
        id: exsit ? exsit.id : null,
        owner_email: session!.email || "",
        page,
        preference: key,
        value
      });

      const rest = preference.filter(
        (item: any) => !(item.preference === key && item.page === page)
      );
      setPreference([...rest, result.data]);
    },
    [page, key, session, exsit, preference, setPreference]
  );

  const { run: saveDebounced } = useDebounceFn(save, { wait: 2000 });

  return {
    value: exsit ? exsit.value : "",
    save,
    saveDebounced
  } as const;
};

export default useHandlePreference;
