import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddWidgetStore } from "@/pages/home/widget-store";

export default function TelemetryOption() {
  const { data, setAttribute } = useAddWidgetStore();

  return (
    <div className="grid grid-cols-[min-content,1fr] items-center gap-x-4 gap-y-2">
      <Label htmlFor="telemetry">Telemetry Name</Label>
      <Input
        value={(data.attributes?.telemetryName as string) || ""}
        onChange={(e) => {
          e.preventDefault();
          setAttribute("telemetryName", e.currentTarget.value);
        }}
      />
    </div>
  );
}
