import { FC } from "react";
import { Box } from "@mui/material";
import Step from "./Step";
import JobInfo from "./JobInfo";
import OverlapStep from "./OverlapStep";

interface Props {
  last4Step: any[];
  overlapStep: any;
}

const CollapsedStep: FC<Props> = ({ last4Step, overlapStep }) => {
  return (
    <>
      <Box
        sx={{ display: "flex", alignItems: "center", height: "100%", flex: 1, gap: 2 }}
      >
        <JobInfo />
        <Box className="flex gap-1">
          {new Array(4).fill(0).map((_, index) => (
            <Box key={index} className="i-mdi-hand-back-right text-[#a8a8a8]" />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            width: "300px",
            gap: 4,
            textAlign: "center"
          }}
        >
          <Box className="i-mdi-chevron-triple-left flex-shrink-0 text-[24px] color-[#a8a8a8] cursor-pointer hover:scale-130" />
          <OverlapStep item={overlapStep} />
          <Box className="i-mdi-arrow-right flex-shrink-0 text-[20px] color-[#a8a8a8]" />
        </Box>
        <Box className="flex flex-shrink-0 w-[30%] gap-2">
          {last4Step.map((item: any) => (
            <Step item={item} key={item.step} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default CollapsedStep;
