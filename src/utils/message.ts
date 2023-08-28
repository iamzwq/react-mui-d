import { useGlobalStore } from "~/stores";

const setSnackBar = useGlobalStore.getState().setSnackBar;

const message = {
  success: (message: string) => {
    setSnackBar({
      open: true,
      message,
      severity: "success"
    });
  },
  error: (message: string) => {
    setSnackBar({
      open: true,
      message,
      severity: "error"
    });
  },
  warning: (message: string) => {
    setSnackBar({
      open: true,
      message,
      severity: "warning"
    });
  },
  hide: () => {
    setSnackBar({
      open: false,
      message: ""
    });
  }
};

export default message;
