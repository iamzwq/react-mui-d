import { FC, useContext } from "react";
import { Box } from "@mui/material";
import ListViewContext from "../context";

const statusMap = new Map([
  [0, { bgcolor: "#f7f8fa" }],
  [1, { icon: "i-mdi-play", color: "#0d5c59", bgcolor: "#93ecb4" }],
  [2, { icon: "i-mdi-check", color: "#2956c6", bgcolor: "#ecf2fe" }],
  [3, { icon: "i-mdi-close", color: "#fff", bgcolor: "#c8502c" }],
  [4, { icon: "i-mdi-exclamation", color: "#484848", bgcolor: "#efefef" }]
]);

const OverlapStep: FC<{ item: any }> = ({ item }) => {
  const { stepMapping = {} } = useContext(ListViewContext) || {};

  const {
    icon: iconClassName,
    color,
    bgcolor = "white"
  } = statusMap.get(item.status) || {};

  return (
    <>
      <Box
        className="flex-center relative z-5"
        sx={{
          flex: 1,
          height: 36,
          borderRadius: "6px",
          userSelect: "none",
          cursor: "pointer",
          fontSize: 14,
          color,
          bgcolor
          // "&::before": {
          //   content: '""',
          //   position: "absolute",
          //   top: 0,
          //   left: 0,
          //   width: "100%",
          //   height: "100%",
          //   borderRadius: "6px",
          //   zIndex: 1,
          //   bgcolor
          // },
          // "&::after": {
          //   content: '""',
          //   position: "absolute",
          //   top: "-10px",
          //   left: "10px",
          //   width: "100%",
          //   height: "100%",
          //   borderRadius: "6px",
          //   zIndex: 2,
          //   bgcolor
          // }
        }}
      >
        <Box
          className={iconClassName}
          sx={{
            fontSize: 16,
            mr: 0.5
          }}
        />
        {stepMapping[item.step] || item.step}
      </Box>
    </>
  );
};

export default OverlapStep;
