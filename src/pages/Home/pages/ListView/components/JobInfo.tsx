import { FC, useContext } from "react";
import { Box, Tooltip } from "@mui/material";
import { formatDate } from "~/utils/date";
import ListViewContext from "../context";
import JobTooltip from "./JobTooltip";
import JobRowContext from "./jobRowContext";
import utils from "~/utils";

const JobInfo: FC = () => {
  const { shipMapping } = useContext(ListViewContext);
  const { job } = useContext(JobRowContext);

  const {
    job_name = "",
    client_name = "",
    project_ref = null,
    expected_record_count = null,
    sla_days = null,
    estimated_shipped_date = null,
    ship_type = "",
    plant_location = ""
  } = job || {};

  const handleShipTypeDisplay = (shipType: string | null) => {
    if (!shipType) return "";

    return shipType
      .split(",")
      .map(item => shipMapping[item]?.ship_type)
      .filter(Boolean)
      .join(",");
  };

  const infoUp = [
    { key: "client_name", value: client_name },
    { key: "product_name", value: project_ref?.product_name },
    { key: "job_name", value: job_name }
  ];

  const infoDown = [
    {
      key: "expected_record_count",
      text: expected_record_count
        ? `${utils.numberToLocaleString(expected_record_count)} Record${
            expected_record_count > 1 ? "s" : ""
          }`
        : "",
      icon: <Box className="i-mdi-account-outline" />
    },
    {
      key: "sla_days",
      text: sla_days ? `${sla_days} Day${sla_days > 1 ? "s" : ""} SLA` : "",
      icon: <Box className="i-mdi-alpha-f-circle-outline" />
    },
    {
      key: "estimated_shipped_date",
      text: formatDate(estimated_shipped_date, "ddd, MMM D, YYYY"),
      icon: <Box className="i-mdi-clock-time-four-outline" />
    },
    {
      key: "ship_type",
      text: handleShipTypeDisplay(ship_type),
      icon: <Box className="i-mdi-clock-time-four-outline" />
    },
    {
      key: "plant_location",
      text: plant_location,
      icon: <Box className="i-mdi-map-marker" />
    }
  ].filter(item => item.text);

  return (
    <>
      <Box className="flex-1">
        <Box
          sx={{
            display: "flex",
            height: 16,
            overflow: "hidden",
            gap: 1.5,
            flexWrap: "wrap"
          }}
        >
          {infoUp.map((item, index) => (
            <Tooltip title={<JobTooltip />} placement="top" arrow key={index}>
              <Box sx={{ fontSize: 13, lineHeight: 1.3, height: 16 }}>{item.value}</Box>
            </Tooltip>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            height: 16,
            overflow: "hidden",
            gap: 2,
            flexWrap: "wrap",
            mt: 2
          }}
        >
          {infoDown.map((item, index) => (
            <Tooltip title={<JobTooltip />} placement="top" arrow key={index}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 14,
                  lineHeight: "28px",
                  height: 16,
                  color:
                    item.key === "estimated_shipped_date" && job.sla
                      ? "#D89241"
                      : "#858585"
                }}
              >
                <Box sx={{ mr: 0.5 }}>{item.icon}</Box>
                {item.text}
              </Box>
            </Tooltip>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default JobInfo;
