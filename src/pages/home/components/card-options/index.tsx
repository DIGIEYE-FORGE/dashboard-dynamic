import { WidgetCardType, widgetCardTypes } from "@/utils";
import { useCallback } from "react";
import TextOption from "./text-option";
import TelemetryOption from "./telemetry-option";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAddWidgetStore } from "../../widget-store";
import { IconPicker } from "@/components/icon-picker";

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

  return (
    <div className="flex flex-col gap-4">
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
