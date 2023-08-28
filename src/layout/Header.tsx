import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Box, IconButton, Tooltip, Typography } from "@mui/material";
import AcountIconBtn from "./AcountIconBtn";
import GlobalSearchInput from "./GlobalSearchInput";

const IconMenu = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexShrink: 0,
          gap: 2,
          ml: "auto",
          fontSize: 24,
          color: "rgba(0, 0, 0, 0.54)"
        }}
      >
        <GlobalSearchInput />
        <Tooltip title="Alerts" arrow placement="top">
          <Badge badgeContent={9} color="error">
            <IconButton>
              <Box className="i-mdi-bell" />
            </IconButton>
          </Badge>
        </Tooltip>
        <Tooltip title="Information" arrow placement="top">
          <IconButton
            onClick={() => {
              navigate("/info");
            }}
          >
            <Box className="i-mdi-information" />
          </IconButton>
        </Tooltip>
        <AcountIconBtn />
      </Box>
    </>
  );
};

const Header: FC = () => {
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          display: "flex",
          gap: 2,
          px: 3,
          alignItems: "center",
          bgcolor: "#d9d9d9",
          zIndex: 100
        }}
      >
        <Box
          component="img"
          src={`https://picsum.photos/178/42?t=${Date.now()}`}
          sx={{
            width: 178,
            height: 42,
            bgcolor: "#ccc",
            cursor: "pointer",
            borderRadius: "4px"
          }}
        />
        <Typography variant="h4">😀 Hello World</Typography>
        <IconMenu />
      </Box>
    </>
  );
};

export default Header;
