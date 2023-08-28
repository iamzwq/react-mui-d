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

const Step: FC<{ item: any }> = ({ item }) => {
  const { stepMapping = {} } = useContext(ListViewContext) || {};

  const {
    icon: iconClassName,
    color,
    bgcolor = "white"
  } = statusMap.get(item.status) || {};

  return (
    <>
      <Box
        className="flex-center relative"
        sx={{
          flex: 1,
          px: 2,
          height: 42,
          fontSize: 14,
          borderRadius: "999px",
          userSelect: "none",
          cursor: "pointer",
          bgcolor,
          color,
          textAlign: "center"
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

export default Step;
