/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChartTelemetry,
  TGroupBy,
  Widget,
  flatten,
  groupByDay,
  groupByHour,
  groupByOptions,
  groupByWeek,
} from "@/utils";
import useSWR from "swr";
import Loader from "@/components/loader";
import ReactApexChart from "react-apexcharts";
import { useState } from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { useId } from "react";
import { cn } from "@/lib/utils";
// import { useTranslation } from "react-i18next";
import axios from "axios";

export default function BarChartWidget(props: Widget) {
  // const { t } = useTranslation();
  const [groupBy, setGroupBy] = useState<TGroupBy>("hour");
  const activeId = useId();
  const chartId = useId();

  const telemetries = (props.attributes?.telemetries || []) as ChartTelemetry[];
  const { apiUrl, token } = props;
  const {
    data: fetchCata,
    isLoading,
    error,
  } = useSWR(apiUrl, async () => {
    if (telemetries.length === 0) return [];
    const { data } = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  });

  const data = useMemo<any>(() => {
    if (!fetchCata) return [];
    let data: any = fetchCata;
    if (!Array.isArray(data)) {
      data = [data];
    }
    return telemetries.map((item: any, index: number) => {
      return {
        name: telemetries[index].label || telemetries[index].name,
        type: "bar",
        data: data.map((item: any) => ({
          x: new Date(),
          y: Number(flatten(item)[telemetries[index].name]),
        })),
      };
    });
  }, [fetchCata, telemetries]);

  const groupedData = useMemo(() => {
    if (!data) return [];
    if (groupBy === "hour") {
      return data.map((item: any) => ({
        ...item,
        data: groupByHour(item.data),
      }));
    }
    if (groupBy === "day") {
      return data.map((item: any) => ({
        ...item,
        data: groupByDay(item.data),
      }));
    }
    if (groupBy === "week") {
      return data.map((item: any) => ({
        ...item,
        data: groupByWeek(item.data),
      }));
    }

    return data;
  }, [data, groupBy]);

  if (isLoading)
    return (
      <main className=" grid place-content-center">
        <Loader />
      </main>
    );
  if (error)
    return (
      <main className="grid place-content-center">
        <h3>{error.message || "An error occurred while fetching the data."}</h3>
      </main>
    );

  if (!data?.length)
    return (
      <main className="grid place-content-center ">
        <h3 className="text-3xl text-foreground/50">No data available.</h3>
        <div>{JSON.stringify({ telemetries })}</div>
      </main>
    );
  return (
    <main className="flex flex-col">
      <div className="flex justify-between flex-wrap gap-4 items-center pr-6">
        <div className="font-semibold">{props.title}</div>
        <div className="flex items-center gap-2 ">
          <span className="text-xs font-medium"> {groupBy}</span>
          <div className=" text-xs  gap-1 flex bg-foreground/5 p-1 rounded-full ">
            {groupByOptions.map((item) => (
              <div className="relative" key={item}>
                <button
                  className={cn("relative z-10 bg px-2 py-1 capitalize", {
                    "hover:opacity-70": groupBy !== item,
                  })}
                  onClick={() => setGroupBy(item as TGroupBy)}
                >
                  {item}
                </button>
                {groupBy === item && (
                  <motion.div
                    className="bg-white dark:bg-white/25 absolute rounded-full inset-0"
                    id={activeId}
                    layoutId={activeId}
                  ></motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <ReactApexChart
          options={{
            // theme: { mode: theme === "dark" ? "dark" : "light" },
            tooltip: {
              cssClass: "text-black",
            },
            colors: telemetries.map((item) => item.color),
            chart: {
              id: chartId,
              type: "bar",
              background: "transparent",
              toolbar: {
                show: false,
              },
              // animations: {
              //   enabled: false,
              // },
              zoom: {
                enabled: false,
              },
              selection: {
                enabled: false,
              },
              dropShadow: {
                enabled: false,
              },
            },
            stroke: {
              width: 2.5,
              curve: "smooth",
            },
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              type: "datetime",
              labels: {
                show: true,
                style: {
                  fontSize: "12px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  cssClass: "apexcharts-xaxis-label",
                },
              },
            },
            yaxis: {
              min: 0,
              tickAmount: 4,
              labels: {
                show: true,
                formatter: function (value) {
                  return value?.toFixed(2);
                },
                style: {
                  fontSize: "12px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  cssClass: "apexcharts-xaxis-label",
                },
              },
            },
          }}
          series={groupedData || []}
          type={"bar"}
          width={"100%"}
          height={"100%"}
        />
      </div>
    </main>
  );
}
