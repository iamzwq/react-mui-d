import { FC, useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import {
  BarChart,
  BarSeriesOption,
  SankeyChart,
  SankeySeriesOption
} from "echarts/charts";
import {
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  TitleComponent,
  TitleComponentOption,
  DataZoomComponent,
  DataZoomComponentOption
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { Box } from "@mui/material";

echarts.use([
  BarChart,
  DataZoomComponent,
  GridComponent,
  TooltipComponent,
  SankeyChart,
  CanvasRenderer,
  TitleComponent
]);

export type EChartsOption = echarts.ComposeOption<
  | BarSeriesOption
  | SankeySeriesOption
  | TooltipComponentOption
  | GridComponentOption
  | TitleComponentOption
  | DataZoomComponentOption
>;

interface Props {
  width: string | number; // chart width
  height: string | number; // chart height
  options: EChartsOption; // chart options
  seriesName?: string; // chart seriesName
  onClick?: (val: any) => void; // chart click event
}

const BaseChart: FC<Props> = ({ width, height, options, onClick, seriesName }) => {
  const chartRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const renderedInstance = echarts.getInstanceByDom(chartRef?.current as HTMLElement);

    const chartInstance =
      renderedInstance || echarts.init(chartRef?.current as HTMLElement);

    /**
     * Set options for the chart
     */
    chartInstance.setOption(options);

    /**
     * Add click listener event
     */
    if (onClick) {
      chartInstance.on("click", { seriesName }, onClick);
    }

    /**
     * Chart resizing events
     */
    const onResizeChart = () => chartInstance?.resize();

    window.addEventListener("resize", onResizeChart);

    return () => {
      if (onClick) {
        chartInstance.off("click", onClick);
      }
      window.removeEventListener("resize", onResizeChart);
      chartInstance?.dispose();
    };
    // eslint-disable-next-line
  }, [options])

  return <Box ref={chartRef} sx={{ width, height }} />;
};

export default BaseChart;
