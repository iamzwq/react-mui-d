import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import NiceModal from "@ebay/nice-modal-react";
import { useGlobalStore } from "./stores";
import router from "./router";

const SnackBarCom = () => {
  const snackBar = useGlobalStore(state => state.snackBar);
  const resetSnackBar = useGlobalStore(state => state.resetSnackBar);

  const { vertical = "top", horizontal = "center", message, open, severity } = snackBar;

  if (!open) return null;

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={resetSnackBar}
      security={severity}
    >
      <Alert severity={severity || "error"} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

const App: FC = () => {
  return (
    <NiceModal.Provider>
      <RouterProvider router={router} />
      <SnackBarCom />
    </NiceModal.Provider>
  );
};

export default App;
