import { FC, useContext } from "react";
import { Box } from "@mui/material";
import { formatDate } from "~/utils/date";
import JobRowContext from "./jobRowContext";
import utils from "~/utils";

const JobTooltip: FC = () => {
  const { job } = useContext(JobRowContext);
  const {
    job_name = "",
    cid = "",
    job_number = "",
    estimated_shipped_date = null,
    shipped_date = null,
    job_created_date = null,
    expected_record_count = null,
    sla_days = null,
    plant_location = null,
    job_platform = null,
    project_ref = null
  } = job || {};

  const arr = [
    { label: "Record Count", value: utils.numberToLocaleString(expected_record_count) },
    { label: "Job Create Date", value: formatDate(job_created_date) },
    { label: "SLA Days", value: sla_days },
    { label: "Ship Date (est)", value: formatDate(estimated_shipped_date) },
    { label: "Plant Ship Date", value: formatDate(shipped_date) },
    { label: "Plant Location", value: plant_location },
    { label: "Platform", value: job_platform?.name }
  ].filter(item => item.value);

  return (
    <Box
      sx={{ m: 0.5, fontSize: 12, width: "max-content" }}
      onContextMenu={e => {
        e.stopPropagation();
      }}
    >
      <Box
        sx={{
          fontSize: 16,
          fontWeight: 600,
          textTransform: "capitalize",
          mb: 0.5
        }}
      >
        Job#{job_number}
      </Box>
      <Box>Job Name: {job_name}</Box>
      {cid ? <Box>CID: {cid}</Box> : null}
      <Box>Client Name: {project_ref?.client_name}</Box>
      <Box>Client Product: {project_ref?.product_name}</Box>
      {arr.map(item => (
        <Box key={item.label}>
          {item.label}: {item.value}
        </Box>
      ))}
    </Box>
  );
};

export default JobTooltip;
