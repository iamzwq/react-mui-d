import { FC, useState } from "react";
import { Box, IconButton, Skeleton } from "@mui/material";
import { useRequest } from "ahooks";
import { useGlobalStore } from "~/stores";
import { useHandlePreference } from "~/hooks";
import { filter_selected_preference } from "~/constants/preference";
import homeApi from "../api";
import BigLoading from "~/componets/BigLoading";
import utils from "~/utils";
import useHomeStore from "../store";
import FilterDropDown from "./FilterDropDown";

const getFilterByNodeId = (nodeId: string, treeData: any[]): any => {
  let target: any = null;

  for (let i = 0; i < treeData.length; i++) {
    const { children, id, filter = null } = treeData[i];
    if (String(id) === nodeId) {
      target = filter;
      break;
    } else if (children) {
      const data = getFilterByNodeId(nodeId, children);
      if (data) return data;
    }
  }

  return target;
};

const FilterIcon = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        sx={{
          width: 32,
          height: 32,
          border: "1px solid #ccc",
          fontSize: 20
        }}
        onClick={handleClick}
      >
        <Box className="i-mdi-menu" />
      </IconButton>
      {!!anchorEl && <FilterDropDown anchorEl={anchorEl} onClose={handleClose} />}
    </>
  );
};

const Filter: FC = () => {
  const searchText = useGlobalStore(state => state.searchText);
  const currFilter = useHomeStore(state => state.currFilter);
  const setCurrFilter = useHomeStore(state => state.setCurrFilter);
  const setFilterTree = useHomeStore(state => state.setFilterTree);

  const { value: preferenceValue } = useHandlePreference(filter_selected_preference);

  const { loading, data } = useRequest(homeApi.fetchAllFilters, {
    onSuccess: ({ data }) => {
      if (data) {
        // set filterTree
        const filterTree = utils.get(data, "filter_tree_structure", []) as any[];
        setFilterTree(filterTree);

        // set currFilter
        const defaultFilter = utils.get(data, "default_filter", null);
        let _currFilter: any = defaultFilter;
        if (preferenceValue) {
          _currFilter = getFilterByNodeId(preferenceValue, filterTree);
        }
        setCurrFilter(_currFilter);
      }
    }
  });

  const filterText = searchText
    ? `Search on ${searchText}`
    : currFilter
    ? `${currFilter.folder_name} ${currFilter.name}`
    : "";

  return (
    <>
      <Box className="flex items-center px-[24px] h-[50px]">
        <FilterIcon />
        <Box component="span" sx={{ ml: 1, lineHeight: "32px" }}>
          {loading && !data ? (
            <Skeleton variant="rectangular" width={150} height={20} />
          ) : (
            filterText
          )}
        </Box>
      </Box>
      {loading && <BigLoading />}
    </>
  );
};

export default Filter;
