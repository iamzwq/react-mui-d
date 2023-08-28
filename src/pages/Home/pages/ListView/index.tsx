import { FC, useMemo, useRef } from "react";
import { Box } from "@mui/material";
import { useRequest } from "ahooks";
import { useGlobalStore } from "~/stores";
import { expected_expand_count } from "~/constants/home";
import homeApi from "../../api";
import useHomeStore from "../../store";
import utils from "~/utils";
import DashboardGroup from "./components/DashboardGroup";
import ScrollTopBtn from "./components/ScrollTopBtn";
import ListViewContext from "./context";
import Empty from "~/componets/Empty";
import BigLoading from "~/componets/BigLoading";

const ListView: FC = () => {
  const searchText = useGlobalStore(state => state.searchText);
  const currFilter = useHomeStore(state => state.currFilter);
  const currSortBy = useHomeStore(state => state.currSortBy);

  const expandCountRef = useRef(expected_expand_count);

  const filterParams = useMemo(() => {
    if (!currFilter && !searchText) return null;
    return {
      ...currSortBy,
      ...(searchText ? { search_text: searchText } : currFilter)
    };
  }, [currFilter, currSortBy, searchText]);

  const { loading, data } = useRequest(
    () =>
      homeApi.fetchDashboardGroups({
        filter: filterParams
      }),
    {
      ready: !!filterParams,
      refreshDeps: [filterParams],
      onBefore: () => {
        expandCountRef.current = expected_expand_count;
      }
    }
  );

  if (!currFilter) return null;
  if (loading) return <BigLoading />;

  const groups = data ? utils.get(data, "data.groups", []) : [];
  const stepMapping = data ? utils.get(data, "data.step_mapping", {}) : {};
  const shipMapping = data ? utils.get(data, "data.ship_type_mapping", {}) : {};

  return (
    <ListViewContext.Provider
      value={{
        filter: filterParams,
        stepMapping,
        shipMapping
      }}
    >
      <Box sx={{ px: 3 }}>
        {groups.length > 0 ? (
          groups.map((group: any, index: number) => {
            const expanded = expandCountRef.current > 0;
            const { completed_count, failed_count, in_progress_count } = group;
            expandCountRef.current -= completed_count + failed_count + in_progress_count;
            return <DashboardGroup key={index} group={group} expanded={expanded} />;
          })
        ) : (
          <Box pt={20}>
            <Empty />
          </Box>
        )}
      </Box>
      <ScrollTopBtn />
    </ListViewContext.Provider>
  );
};

export default ListView;
