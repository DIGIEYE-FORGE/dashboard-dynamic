import { InfoIcon, MoreVertical, PenIcon, Trash } from "lucide-react";
import {
  SpeedDial,
  SpeedDialContent,
  SpeedDialTrigger,
} from "@/components/speed-dial";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Widget } from "@/utils";
import { useCallback } from "react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/button";
import { useGridStore } from "../../grid-store";
import { useAddWidgetStore } from "../../widget-store";
import { cn } from "@/lib/utils";
import LineChartWidget from "../line-chart-widget";
// import VideoWidget from "../video-widget";
// import CardWidget from "../card-widget";
// import GaugeWidget from "../gauge-widget";
// import LineChartWidget from "../line-chart-widget";
// import BarChartWidget from "../bar-chart-widget";
// import AreaChartWidget from "../area-chart-widget";
// import PieChartWidget from "../pie-chart-widget";
// import DonutChartWidget from "../donut-chart-widget";
// import TableWidget from "../table-widget";
// import { useTranslation } from "react-i18next";
// import TableWidget from "../table-widget";
// import BatteryWidget from "../battery-widget";
// import ProgressBarWidget from "../progress-bar-widget";
// import MapWidget from "../map-widget";
// import SignalWidget from "../signal-widget";
// import HeatMapWidget from "../heat-map-widget";
// import QrCodeWidget from "../qr-code-widget";
// import StateWidget from "../state-widget";

type Props = {
  item: Widget;
};

function WithHeader(Comp: JSX.Element, title: string) {
  return (
    <>
      <h3 className="!pb-1  first-letter:uppercase font-semibold truncate">
        {title}
      </h3>
      <div className="flex-1 h-1 !pt-1">{Comp}</div>
    </>
  );
}

export default function WidgetContent({ item }: Props) {
  const { editMode, layouts, setLayouts, widgets, setWidgets, setWidgetId } =
    useGridStore();
  const { setData } = useAddWidgetStore();

  const deleteItem = (id: string) => {
    setLayouts(layouts.filter((l) => l.i !== id));
    setWidgets(widgets.filter((w) => w.id !== id));
  };

  const Comp = useCallback(() => {
    // if (item.type === "areaChart") return <AreaChartWidget {...item} />;
    // if (item.type === "barChart") return <BarChartWidget {...item} />;
    if (item.type === "lineChart") return <LineChartWidget {...item} />;
    // if (item.type === "pieChart")
    //   return WithHeader(<PieChartWidget {...item} />, item.title);
    // if (item.type === "donutChart")
    //   return WithHeader(<DonutChartWidget {...item} />, item.title);
    // if (item.type === "card") return <CardWidget {...item} />;
    // if (item.type === "video") return <VideoWidget {...item} />;
    // if (item.type === "gauge")
    //   return WithHeader(<GaugeWidget {...item} />, item.title);
    // if (item.type === "table")
    //   return WithHeader(<TableWidget {...item} />, item.title);
    return <div>Unknown widget type: {item.type}</div>;
    // if (item.type === "table")
    //   return WithHeader(<TableWidget {...item} />, item.title);
    // if (item.type === "battery")
    //   return WithHeader(<BatteryWidget {...item} />, item.title);
    // if (item.type === "progressBar")
    //   return WithHeader(<ProgressBarWidget {...item} />, item.title);
    // if (item.type === "signal")
    //   return WithHeader(<SignalWidget {...item} />, item.title);
    // if (item.type === "heatmap")
    //   return WithHeader(<HeatMapWidget {...item} />, item.title);
    // if (item.type === "qrCode")
    //   return WithHeader(<QrCodeWidget {...item} />, item.title);
    // if (item.type === "map")
    //   return WithHeader(<MapWidget {...item} />, item.title);
    // if (item.type === "state") return <StateWidget {...item} />;
    // return <div>Unknown widget type: {item.type}</div>;
  }, [item]);
  return (
    <>
      <SpeedDial>
        <SpeedDialTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "absolute top-2 !p-0 !size-6 z-10 right-2 text-foreground/50",
              {
                hidden: editMode,
              }
            )}
          >
            <MoreVertical size={16} />
          </Button>
        </SpeedDialTrigger>
        <SpeedDialContent>
          <Button
            size="icon"
            className={cn(
              "size-8 bg-card text-card-foreground hover:bg-card hover:brightness-95 active:shadow-inner border"
            )}
            onClick={(e) => {
              e.stopPropagation();
              deleteItem(item.id);
            }}
          >
            <Trash size={12} />
          </Button>
          <Button
            size="icon"
            className={cn(
              "size-8 bg-card text-card-foreground hover:bg-card hover:brightness-95 active:shadow-inner border"
            )}
            onClick={(e) => {
              e.stopPropagation();
              setWidgetId(item.id);
              setData(item);
            }}
          >
            <PenIcon size={12} />
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className={cn({
                    hidden: !item.description,
                  })}
                >
                  <InfoIcon size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-sm">{item.description}</div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </SpeedDialContent>
      </SpeedDial>
      <Comp />
    </>
  );
}
