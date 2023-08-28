import { FC } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout: FC = () => {
  return (
    <>
      <Header />
      <Box component="main" sx={{ mt: "80px", mb: "30px" }}>
        <Outlet />
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          px: 3,
          bgcolor: "#fff",
          textAlign: "right",
          fontSize: "12px",
          color: "#999"
        }}
      >
        version: 123123
      </Box>
    </>
  );
};

export default Layout;
