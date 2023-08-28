import { FC } from "react";
import { Box, Tooltip } from "@mui/material";
import CollapsedStep from "./CollapsedStep";
import JobRowContext from "./jobRowContext";
import JobTooltip from "./JobTooltip";

interface Props {
  job: any;
}

const JobNumber: FC<{ job: any }> = ({ job }) => {
  const { cid = "", job_number = "" } = job || {};

  return (
    <Tooltip title={<JobTooltip />} placement="top" arrow>
      <Box className="flex flex-col line-height-[30px] text-[14px] w-[100px] flex-shrink-0">
        <Box>Job#{job_number}</Box>
        <Box>CID#{cid}</Box>
      </Box>
    </Tooltip>
  );
};

const JobRow: FC<Props> = ({ job }) => {
  // const allSteps = job.job_details || [];
  const last4Step = job.last_plant_process_steps || [];
  const overlapStep = job.last_process_job_details?.[0] || null;

  return (
    <>
      <JobRowContext.Provider value={{ job }}>
        <Box
          className="flex items-center h-[80px]"
          sx={{
            border: "1px solid #E0E0E0",
            borderRadius: "4px",
            px: 1,
            borderLeftWidth: job.sla ? "5px" : "1px",
            borderLeftColor: job.sla ? "#D89241" : "#E0E0E0"
          }}
        >
          <JobNumber job={job} />
          <CollapsedStep last4Step={last4Step} overlapStep={overlapStep} />
          {/* <AllStep steps={allSteps} /> */}
        </Box>
      </JobRowContext.Provider>
    </>
  );
};

export default JobRow;
