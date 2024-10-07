import { WidgetType } from "@/utils";
import PieLogo from "@/assets/widgets/pie.svg?react";
import CardLogo from "@/assets/widgets/card.svg?react";
import AreaLogo from "@/assets/widgets/area.svg?react";
import BarLogo from "@/assets/widgets/bar.svg?react";
import DonutLogo from "@/assets/widgets/donut.svg?react";
import GaugeLogo from "@/assets/widgets/gauge.svg?react";
import LineLogo from "@/assets/widgets/line.svg?react";
import TableLogo from "@/assets/widgets/table.svg?react";
import VideoLogo from "@/assets/widgets/video.svg?react";
import { cn } from "@/lib/utils";
import { useAddWidgetStore } from "../../widget-store";

const WidgetMap: Record<WidgetType, React.ReactNode> = {
  areaChart: <AreaLogo className="w-full h-full" />,
  barChart: <BarLogo className="w-full h-full" />,
  card: <CardLogo className="w-full h-full" />,
  donutChart: <DonutLogo className="w-full h-full" />,
  gauge: <GaugeLogo className="w-full h-full" />,
  lineChart: <LineLogo className="w-full h-full" />,
  pieChart: <PieLogo className="w-full h-full" />,
  table: <TableLogo className="w-full h-full" />,
  video: <VideoLogo className="w-full h-full" />,
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type: WidgetType;
  active?: boolean;
}

export default function WidgetLogo({ type, className, ...props }: Props) {
  const { setType, data } = useAddWidgetStore();
  const active = data.type === type;
  return (
    <div
      className={cn(
        "flex flex-col p-2 gap-2  relative rounded-lg transition-colors cursor-pointer hover:bg-gray-500/5 outline outline-transparent active:shadow-inner shadow-black/10",
        {
          "bg-primary/10 dark:bg-white/10 hover:bg-primary-500/10": active,
        },
        className
      )}
      role="button"
      onClick={() => {
        setType(type);
      }}
      {...props}
    >
      <div className="w-full aspect-square [&>*]:fill-card-foreground text-teal-500">
        {WidgetMap[type]}
      </div>
      <div className="text-center text-sm capitalize w-fit">{type}</div>
    </div>
  );
}
