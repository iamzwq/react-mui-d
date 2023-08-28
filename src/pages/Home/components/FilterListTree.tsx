import { FC, Fragment, useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  Box,
  ListItemText,
  Collapse
} from "@mui/material";
import { useGlobalStore } from "~/stores";
import { useHandlePreference } from "~/hooks";
import {
  filter_folder_open_preference,
  filter_selected_preference
} from "~/constants/preference";
import useHomeStore from "../store";

interface Props {
  list: any[];
  onClose: () => void;
}

const FilterListTree: FC<Props> = ({ list, onClose }) => {
  const currFilter = useHomeStore(state => state.currFilter);
  const setCurrFilter = useHomeStore(state => state.setCurrFilter);
  const setSearchText = useGlobalStore(state => state.setSearchText);

  const { save: saveFilter } = useHandlePreference(filter_selected_preference);
  const { value: _openArr, saveDebounced: saveFolder } = useHandlePreference(
    filter_folder_open_preference
  );
  const [openArr, setOpenArr] = useState<Array<string>>(_openArr.split(","));

  const handleOpenFolder = (id: string) => {
    const index = openArr.indexOf(id);
    if (index > -1) {
      openArr.splice(index, 1);
    } else {
      openArr.push(id);
    }
    saveFolder(openArr.join(","));
    setOpenArr([...openArr]);
  };

  const handleClick = (item: any) => {
    const { isFolder, id, filter } = item;
    if (isFolder) {
      handleOpenFolder(id + "");
    } else {
      saveFilter(id + "");
      setCurrFilter(filter);
      setSearchText("");
      onClose();
    }
  };

  const generateTreeItem = (treeItem: any, level = 1) => {
    const { isFolder, id, name, children } = treeItem;
    const open = openArr.includes(id);

    return (
      <Fragment key={id}>
        <ListItemButton
          sx={{
            py: 0.5,
            pl: level * 2,
            color: currFilter && currFilter.id === id ? "primary.main" : "",
            bgcolor: currFilter && currFilter.id === id ? "rgba(0, 0, 0, 0.04)" : ""
          }}
          onClick={() => {
            handleClick(treeItem);
          }}
        >
          <ListItemIcon sx={{ mr: 1, minWidth: 0, fontSize: 24, color: "inherit" }}>
            <Box
              className={
                !isFolder ? "i-mdi-file" : open ? "i-mdi-folder-open" : "i-mdi-folder"
              }
            />
          </ListItemIcon>
          <ListItemText>{name}</ListItemText>
        </ListItemButton>
        {children && (
          <Collapse in={openArr.includes(id)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {children.map((item: any) => generateTreeItem(item, level + 1))}
            </List>
          </Collapse>
        )}
      </Fragment>
    );
  };

  return (
    <>
      <List sx={{ maxHeight: 500, overflowY: "auto" }}>
        {list.map(item => generateTreeItem(item))}
      </List>
    </>
  );
};

export default FilterListTree;
