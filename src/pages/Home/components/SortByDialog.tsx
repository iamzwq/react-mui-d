import { useRef, useState } from "react";
import { Box, Button, IconButton, MenuItem, Select } from "@mui/material";
import { useUpdate } from "ahooks";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { group_by_options, sort_by_options } from "~/constants/home";
import { sort_by_selected_preference } from "~/constants/preference";
import { useHandlePreference } from "~/hooks";
import useHomeStore from "../store";
import BaseDialog from "~/componets/BaseDialog";

interface Props {
  title: string;
}

const SortByDialog = NiceModal.create<Props>(({ title }) => {
  const modal = useModal();

  const { save } = useHandlePreference(sort_by_selected_preference);

  const currSortBy = useHomeStore(state => state.currSortBy);
  const setCurrSortBy = useHomeStore(state => state.setCurrSortBy);

  const [groupColumns, setGroupColumns] = useState(currSortBy.group_columns || []);
  const [sortColumn, setSortColumn] = useState(currSortBy.sort_column || {});

  const draggingIndexRef = useRef<number>(-1);

  const update = useUpdate();

  const handleOk = () => {
    const newSortBy = {
      group_columns: groupColumns,
      sort_column: sortColumn
    };
    setCurrSortBy(newSortBy);
    save(JSON.stringify(newSortBy));
    modal.remove();
  };

  return (
    <>
      <BaseDialog
        title={title}
        maxWidth="sm"
        okText="Save"
        open={modal.visible}
        handleClose={() => {
          modal.remove();
        }}
        handleOk={handleOk}
      >
        <Box className="flex">
          <Box className="w-[82px] text-right line-height-[40px]">Group By:</Box>
          <Box className="selectedWrapper flex-1 pl-2">
            {groupColumns.map((item: any, index: number) => {
              return (
                <Box
                  key={item.column}
                  className="item flex"
                  sx={{ opacity: draggingIndexRef.current === index ? 0.3 : 1 }}
                  draggable
                  onDragStart={() => {
                    draggingIndexRef.current = index;
                    update();
                  }}
                  onDragEnd={() => {
                    draggingIndexRef.current = -1;
                    update();
                  }}
                  onDragEnter={() => {
                    if (
                      draggingIndexRef.current !== -1 &&
                      draggingIndexRef.current === index
                    )
                      return;
                    const newGroupColumns = [...groupColumns];
                    const temp = newGroupColumns[index];
                    newGroupColumns[index] = newGroupColumns[draggingIndexRef.current];
                    newGroupColumns[draggingIndexRef.current] = temp;
                    draggingIndexRef.current = index;
                    setGroupColumns([...newGroupColumns]);
                  }}
                >
                  <Select
                    sx={{ width: 160, mb: 1 }}
                    size="small"
                    value={item.column}
                    onChange={e => {
                      const newGroupColumns = [...groupColumns];
                      newGroupColumns[index] = {
                        ...newGroupColumns[index],
                        column: e.target.value
                      };
                      setGroupColumns([...newGroupColumns]);
                    }}
                  >
                    {group_by_options.map(option => {
                      const disabled = groupColumns.some(
                        (val: any) => val.column === option.id
                      );
                      return (
                        <MenuItem key={option.id} value={option.id} disabled={disabled}>
                          {option.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {groupColumns.length > 1 && (
                    <>
                      <IconButton
                        className="w-[40px] h-[40px]"
                        onClick={() => {
                          const newGroupColumns = [...groupColumns];
                          newGroupColumns.splice(index, 1);
                          setGroupColumns([...newGroupColumns]);
                        }}
                      >
                        <Box className="i-mdi-trash" />
                      </IconButton>
                      <IconButton className="w-[40px] h-[40px]" sx={{ cursor: "move" }}>
                        <Box className="i-mdi-drag-horizontal" />
                      </IconButton>
                    </>
                  )}
                </Box>
              );
            })}
            {/* add group by button */}
            {groupColumns.length < group_by_options.length && (
              <Button
                variant="outlined"
                sx={{
                  color: "primary.main",
                  borderColor: "primary.main",
                  borderRadius: "999px"
                }}
                onClick={() => {
                  const noSelecteds = group_by_options.filter(
                    op => !groupColumns.some((val: any) => val.column === op.id)
                  );
                  const newGroupColumns = [...groupColumns];
                  newGroupColumns.push({
                    column: noSelecteds[0].id,
                    reversed_order: false
                  });
                  setGroupColumns([...newGroupColumns]);
                }}
              >
                Add Group By
              </Button>
            )}
          </Box>
        </Box>
        <Box className="flex mt-2">
          <Box className="w-[82px] text-right line-height-[40px]">Sort By:</Box>
          <Box className="flex-1 pl-2">
            <Select
              sx={{ width: 160 }}
              size="small"
              value={sortColumn.column}
              onChange={e => {
                setSortColumn({ ...sortColumn, column: e.target.value });
              }}
            >
              {sort_by_options.map((option: any) => {
                return (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
        </Box>
      </BaseDialog>
    </>
  );
});

export default SortByDialog;
