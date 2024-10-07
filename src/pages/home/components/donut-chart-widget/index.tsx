/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "@/components/loader";
import { ChartTelemetry, flatten, Widget } from "@/utils";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import useSWR from "swr";

export default function PieChartWidget(props: Widget) {
  const telemetries = (props.attributes?.telemetries || []) as ChartTelemetry[];
  const { apiUrl, token } = props;

  const id = "chart-" + props.id;

  const { data, isLoading, error } = useSWR(apiUrl, async () => {
    if (telemetries.length === 0) return;
    const { data } = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  });

  if (isLoading)
    return (
      <div className="w-full h-full  grid place-content-center">
        <Loader />
      </div>
    );
  if (error)
    return (
      <main className="grid place-content-center">
        <h3>{error.message || "An error occurred while fetching the data."}</h3>
      </main>
    );

  let series: any = data;
  if (Array.isArray(data)) series = data[0];
  series = telemetries.map((item) => {
    return Number(flatten(data)[item.name]);
  });
  console.log({ series });
  return (
    <div className=" w-full h-full  ">
      <ReactApexChart
        series={series || []}
        options={{
          chart: {
            id,
            type: "donut",
            background: "transparent",
          },
          legend: {
            position: "bottom",
          },
          colors: telemetries.map((t) => t.color || "#000"),
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return Number(val).toFixed(2) + "%";
            },
          },
          labels: telemetries.map(
            (t) => t.label || t?.name?.split(".").at(-1) || ""
          ),
        }}
        type={"donut"}
        width={"105%"}
        height={"105%"}
      />
    </div>
  );
}
