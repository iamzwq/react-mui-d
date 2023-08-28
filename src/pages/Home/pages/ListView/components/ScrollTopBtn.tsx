import { FC } from "react";
import { Box, Fade, IconButton } from "@mui/material";
import { useScroll } from "ahooks";

const ScrollTopBtn: FC = () => {
  const scroll = useScroll(document, val => val.top >= 0 && val.top < 20);

  return (
    <>
      <Fade in={scroll ? scroll.top > 0 : false}>
        <IconButton
          sx={{
            position: "fixed",
            bottom: "40px",
            right: "20px",
            width: "40px",
            height: "40px",
            borderRadius: "999px",
            zIndex: 101,
            bgcolor: "white",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.25)",
            "&:hover": {
              bgcolor: "white"
            }
          }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Box className="i-mdi-chevron-up" fontSize={32} />
        </IconButton>
      </Fade>
    </>
  );
};

export default ScrollTopBtn;
