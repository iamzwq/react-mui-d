import { FC, useState } from "react";
import { Box, Button, Popover } from "@mui/material";
import FilterListTree from "./FilterListTree";
import useHomeStore from "../store";

interface Props {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const AddNewBtn = () => {
  return (
    <>
      <Button
        endIcon={<Box className="i-mdi-plus" />}
        disableRipple
        sx={{
          px: 2,
          bgcolor: "white",
          borderRadius: "100px",
          color: "#515151",
          textTransform: "none",
          "&:hover": {
            bgcolor: "white",
            color: "#515151"
          }
        }}
      >
        Add New
      </Button>
    </>
  );
};

const FilterDropDown: FC<Props> = ({ anchorEl, onClose }) => {
  const filterTree = useHomeStore(state => state.filterTree);

  const [active, setActive] = useState("Public Filters");

  const data = filterTree.find((item: any) => item.id === active);
  const list = data ? data.children : [];

  return (
    <>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        slotProps={{
          paper: { sx: { width: "500px", mt: 1 } }
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2.5,
            height: 55,
            bgcolor: "#e6e7e8"
          }}
        >
          <Box
            sx={{
              fontSize: 20,
              fontWeight: 500
            }}
          >
            Filters
          </Box>
          <AddNewBtn />
        </Box>
        <Box sx={{ bgcolor: "white" }}>
          <Box sx={{ display: "flex", mt: 0.5 }}>
            {[
              { title: "Public", key: "Public Filters" },
              { title: "Personal", key: "Personal Filters" },
              { title: "Favorites", key: "Favorites Filters", disabled: true }
            ].map((item, index) => {
              return (
                <Box
                  key={item.key}
                  onClick={() => {
                    if (item.disabled) return;
                    setActive(item.key);
                  }}
                  sx={{
                    flex: 1,
                    height: 35,
                    textAlign: "center",
                    lineHeight: "35px",
                    color: active === item.key ? "#000" : "#9b9b9b",
                    cursor: item.disabled ? "not-allowed" : "pointer",
                    bgcolor: active === item.key ? "#e6e7e8" : "transparent",
                    borderLeft: index === 0 ? "none" : "1px solid rgba(0, 0, 0, 0.12)",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    fontWeight: active === item.key ? 600 : "normal"
                  }}
                >
                  {item.title}
                </Box>
              );
            })}
          </Box>
          <FilterListTree list={list} onClose={onClose} />
        </Box>
      </Popover>
    </>
  );
};

export default FilterDropDown;
