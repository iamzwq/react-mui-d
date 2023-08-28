import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#029d94"
    }
  },
  typography: {
    fontFamily: "IBM Plex Sans, Roboto, Inter, system-ui"
  },
  components: {
    MuiButtonBase: {
      defaultProps: {},
      styleOverrides: {
        root: {
          textTransform: "none"
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          textTransform: "none"
        },
        containedPrimary: {
          color: "#fff"
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          padding: 0
        }
      }
    }
  }
});
