import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, IconButton, Tooltip } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Filter from "./Filter";
import SortBy from "./SortBy";

const view_btns = [
  {
    key: "/home/list-view",
    title: "List View",
    icon: "i-mdi-format-list-bulleted"
  },
  {
    key: "/home/graph-view",
    title: "Graph View",
    icon: "i-mdi-chart-bar"
  },
  {
    key: "/home/flow-view",
    title: "Flow View",
    icon: "i-mdi-chart-sankey-variant"
  }
];

const ViewBtns = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "flex-start", lg: "center" },
        px: { xs: 3, lg: 0 },
        height: 50,
        gap: 1.5
      }}
    >
      {view_btns.map(btn => {
        const active = pathname === btn.key;
        return (
          <Tooltip title={btn.title} key={btn.key} arrow placement="top">
            <IconButton
              sx={{
                width: 26,
                height: 26,
                border: "1px solid #e0e0e0",
                fontSize: 17,
                color: active ? "#fff" : "",
                bgcolor: active ? "primary.main" : "#d9d9d9",
                "&:hover": {
                  bgcolor: active ? "primary.main" : "#d9d9d9"
                }
              }}
              onClick={() => {
                navigate(btn.key);
              }}
            >
              <div className={btn.icon} />
            </IconButton>
          </Tooltip>
        );
      })}
    </Box>
  );
};

const HomeHeader: FC = () => {
  return (
    <>
      <Grid
        container
        sx={{
          bgcolor: "#f4f4f4",
          position: "sticky",
          top: "80px",
          zIndex: 100
        }}
      >
        <Grid xs={12} lg={5.5}>
          <Filter />
        </Grid>
        <Grid xs={12} lg={1}>
          <ViewBtns />
        </Grid>
        <Grid xs={12} lg={5.5}>
          <SortBy />
        </Grid>
      </Grid>
    </>
  );
};

export default HomeHeader;
