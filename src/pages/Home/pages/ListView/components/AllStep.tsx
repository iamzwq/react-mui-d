import { FC } from "react";
import { Box } from "@mui/material";
import Step from "./Step";

interface Props {
  steps: any[];
}

const AllStep: FC<Props> = ({ steps }) => {
  return (
    <>
      <Box sx={{ display: "flex", flex: 1 }}>
        {steps.map((item: any, index: number) => (
          <Step key={index} item={item} />
        ))}
      </Box>
    </>
  );
};

export default AllStep;
