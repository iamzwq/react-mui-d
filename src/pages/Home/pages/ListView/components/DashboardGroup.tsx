import { FC, useContext, useState } from "react";
import { Box, CircularProgress, Collapse, IconButton, Typography } from "@mui/material";
import { useRequest } from "ahooks";
import homeApi from "../../../api";
import JobRow from "./JobRow";
import ListViewContext from "../context";

interface Props {
  group: any;
  expanded: boolean;
}

const DashboardGroup: FC<Props> = ({ group, expanded }) => {
  const { filter } = useContext(ListViewContext);

  const [open, setOpen] = useState(expanded);
  const [allStepVisible] = useState(false);

  const fetchJobs = (filter: any, group_key: string) => {
    if (allStepVisible) {
      return homeApi.fetchDashboardJobs({ filter, group_key });
    }
    return homeApi.fetchDashboardCollapsedJobs({ filter, group_key });
  };

  const { loading, data } = useRequest(() => fetchJobs(filter, group.group_key), {
    ready: open && group.group_key,
    refreshDeps: [open, group, allStepVisible]
  });

  const jobs = data ? data.data.jobs : [];

  return (
    <>
      <Box className="flex items-center h-[70px] sticky top-[130px] z-100 bg-white">
        <Box
          className="inline-flex cursor-pointer"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <IconButton sx={{ mr: 1 }}>
            <Box
              className="i-mdi-chevron-right"
              sx={{
                transform: open ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.3s"
              }}
            />
          </IconButton>
          <Typography variant="h6" sx={{ userSelect: "none" }}>
            {group.group_name}
          </Typography>
        </Box>
      </Box>
      <Collapse in={open}>
        <Box
          sx={{
            position: "relative",
            minHeight: 80,
            display: "flex",
            flexDirection: "column",
            gap: 2
          }}
        >
          {jobs.map((job: any, index: number) => {
            return <JobRow key={index} job={job} />;
          })}
          {loading && (
            <Box className="flex-center absolute inset-0 bg-[rgba(255,255,255,0.5)]">
              <CircularProgress size={40} />
            </Box>
          )}
        </Box>
      </Collapse>
    </>
  );
};

export default DashboardGroup;
