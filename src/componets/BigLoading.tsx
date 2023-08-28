import { FC } from "react";
import { Box, CircularProgress } from "@mui/material";

const BigLoading: FC = () => {
  return (
    <Box
      className="flex-center"
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        bgcolor: "rgba(0,0,0,0.5)"
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
};

export default BigLoading;
