import { FC } from "react";
import { Box } from "@mui/material";
import NiceModal from "@ebay/nice-modal-react";
import useHomeStore from "../store";
import SortByDialog from "./SortByDialog";

const SortBy: FC = () => {
  const currSortBy = useHomeStore(state => state.currSortBy);

  const sortColumn = currSortBy.sort_column || {};
  const groupColumns = currSortBy.group_columns || [];

  const groupText = groupColumns.map((item: any) => item.column).join(",");

  const text = `${groupText} ${sortColumn.column || ""}`;

  return (
    <>
      <Box className="flex items-center px-[24px] h-[50px]">
        <Box
          sx={{
            ml: { xs: 0, lg: "auto" },
            px: 3,
            height: "38px",
            lineHeight: "38px",
            bgcolor: "white",
            border: "1px solid #e0e0e0",
            borderRadius: "100px",
            cursor: "pointer"
          }}
          onClick={() => {
            NiceModal.show(SortByDialog, { title: "Group By" });
          }}
        >
          {text}
        </Box>
      </Box>
    </>
  );
};

export default SortBy;
