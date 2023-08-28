import { FC, PropsWithChildren } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Typography
} from "@mui/material";

type Props = DialogProps & {
  // custom props
  title: string; // Dialog title
  titleOffset?: string; // Position Offset value for title in case a dialog want to add some element before the title
  showHeader?: boolean; // Whether to show the dialog header
  showCloseIcon?: boolean; // Whether to display the close icon
  hideFooter?: boolean; // Whether to hide the footer
  saveDisabled?: boolean; // Whether to disable the save button
  okText?: string; // Text for the confirm button
  okOnly?: boolean; // Whether only to show ok button
  cancelText?: string; // The text of the cancel button
  handleOk?: () => void; // The method of the confirm button
  handleClose?: () => void; // // The method of the cancel button
};

const BaseDialog: FC<PropsWithChildren<Props>> = props => {
  const {
    title,
    titleOffset = "0px",
    maxWidth = "md",
    showHeader = true,
    showCloseIcon,
    handleClose,
    handleOk,
    hideFooter,
    saveDisabled = false,
    okText = "Confirm",
    okOnly = false,
    cancelText = "Cancel",
    children,
    ...dialogProps
  } = props;

  return (
    <Dialog
      disableEscapeKeyDown
      fullWidth
      maxWidth={maxWidth}
      PaperProps={{
        elevation: 0,
        variant: "outlined",
        sx: {
          border: "1px solid #EFEFEF",
          boxShadow: "-4px -4px 12px #aaaaaa29, 4px 4px 12px #aaaaaa29"
        }
      }}
      slotProps={{
        backdrop: {
          sx: { background: "rgba(255, 255, 255, 0.4)", backdropFilter: "blur(4px)" }
        }
      }}
      {...dialogProps}
    >
      {showHeader && (
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#E6E7E8"
          }}
        >
          <Typography
            marginLeft={titleOffset}
            component="span"
            variant="h5"
            className="titleBeforeBlock"
            fontWeight="600"
          >
            {title}
          </Typography>
          {showCloseIcon && (
            <IconButton size="small" onClick={() => handleClose?.()} sx={{ p: 0 }}>
              <Box className="i-mdi-close" />
            </IconButton>
          )}
        </DialogTitle>
      )}
      <DialogContent sx={{ mt: 2, pb: 1 }}>{children}</DialogContent>
      {!hideFooter && (
        <DialogActions sx={{ px: 3, py: 2 }}>
          {!okOnly && (
            <Button
              variant="outlined"
              onClick={() => handleClose?.()}
              sx={{ borderRadius: "20px", px: 2.5, width: "104px", height: "36px" }}
            >
              {cancelText}
            </Button>
          )}
          <Button
            disabled={saveDisabled}
            variant="contained"
            onClick={() => handleOk?.()}
            sx={{ borderRadius: "20px", px: 2.5, width: "104px", height: "36px" }}
          >
            {okText}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default BaseDialog;
