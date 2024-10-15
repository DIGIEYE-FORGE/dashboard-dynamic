/* eslint-disable @typescript-eslint/no-explicit-any */
import { WidgetCardType, widgetCardTypes } from "@/utils";
import { useCallback, useState } from "react";
import TextOption from "./text-option";
import TelemetryOption from "./telemetry-option";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAddWidgetStore } from "../../widget-store";
import { IconPicker } from "@/components/icon-picker";
import Card1 from "./cards/card1";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
const Cards: {
  x: number;
  y: number;
  color: string;
  position: "center" | "left" | "right" | "reverseCenter";
}[] = [
  {
    x: 1,
    y: 2,
    color: "#d7d70d",
    position: "center",
  },
  {
    x: 2,
    y: 2,
    color: "#bd1f1f",
    position: "left",
  },
  {
    x: 2,
    y: 2,
    color: "#8fd418",
    position: "right",
  },
  {
    x: 1,
    y: 2,
    color: "#d7d70d",
    position: "reverseCenter",
  },
];
export default function CardOptions() {
  const { data, setAttribute } = useAddWidgetStore();

  const setCardType = (type: WidgetCardType) => {
    setAttribute("type", type);
  };

  const setIcon = (icon: string) => {
    setAttribute("icon", icon);
  };

  const type = data.attributes?.type as WidgetCardType;

  const CardOption = useCallback(() => {
    if (type === "text") return <TextOption />;
    if (type === "telemetry") return <TelemetryOption />;
    return null;
  }, [type]);

  const [selectedType, setSelectedType] = useState<
    "left" | "center" | "reverseCenter" | "right"
  >("left");
  return (
    <div className="flex flex-col gap-4 ">
      <div className="grid grid-cols-3 auto-rows-[4rem]  gap-4 grid-flow-dense p-2">
        {Cards.map((item, index) => {
          return (
            <motion.div
              onClick={() => {
                setSelectedType(item.position);
                setAttribute("position", item.position);
              }}
              whileHover={{ scale: 1.05 }}
              className={cn(
                "rounded-lg shadow-lg border border-gray-700 bg-m gap-2 ",
                {
                  "border-primary": item.position === selectedType,
                }
              )}
              key={index}
              style={{
                gridColumn: `span ${item.x}`,
                gridRow: `span ${item.y}`,
              }}
            >
              <Card1 position={item.position as any} />
            </motion.div>
          );
        })}
      </div>
      <IconPicker onSelect={setIcon} />
      <RadioGroup
        defaultValue={type}
        onValueChange={(value) => setCardType(value as WidgetCardType)}
      >
        {widgetCardTypes.map((item) => {
          return (
            <div key={item} className="flex items-center space-x-2">
              <RadioGroupItem value={item} id={item} />
              <Label htmlFor={item}>{item}</Label>
            </div>
          );
        })}
      </RadioGroup>
      <CardOption />
    </div>
  );
}
