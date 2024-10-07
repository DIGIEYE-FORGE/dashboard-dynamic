import { ChartTelemetry, LineChartWidgetData } from "@/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { PlusIcon, TrashIcon } from "lucide-react";
import ColorPicker from "@/components/color-picker";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAddWidgetStore } from "../../widget-store";

const defaultTelemetry: ChartTelemetry = {
  serial: "",
  name: "",
  label: "",
  color: "#d32727",
  unit: "",
};

export default function LineChartOptions() {
  const { data, addTelemetry, deleteTelemetry } = useAddWidgetStore();
  const [telemetryData, setTelemetryData] = useState(defaultTelemetry);

  const { telemetries = [] } = data.attributes as LineChartWidgetData;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.stopPropagation();
    e.preventDefault();

    if (!telemetryData.serial || !telemetryData.name) return;

    addTelemetry(telemetryData);
  }

  return (
    <div className="flex flex-col gap-4 relative">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-x-2 gap-y-3"
      >
        <Input
          placeholder="serial"
          value={telemetryData.serial}
          onChange={(e) => {
            setTelemetryData((prev) => ({
              ...prev,
              serial: e.target.value,
            }));
          }}
        />
        <Input
          className="rounded"
          placeholder="name"
          name="name"
          value={telemetryData.name}
          onChange={(e) => {
            setTelemetryData((prev) => ({
              ...prev,
              name: e.target.value,
            }));
          }}
        />

        <Input
          className="rounded"
          placeholder={"label"}
          name="label"
          value={telemetryData.label}
          onChange={(e) => {
            setTelemetryData((prev) => ({
              ...prev,
              label: e.target.value,
            }));
          }}
        />
        <Input
          className="rounded"
          placeholder={"unit"}
          name="unit"
          value={telemetryData.unit}
          onChange={(e) => {
            setTelemetryData((prev) => ({
              ...prev,
              unit: e.target.value,
            }));
          }}
        />
        <ColorPicker
          className="rounded-md w-full !e !ring-0 h-9 outline-none border-none"
          color={telemetryData.color}
          onChange={(color) => {
            setTelemetryData((prev) => ({
              ...prev,
              color,
            }));
          }}
        />
        <Button
          type="submit"
          variant="outline"
          disabled={!telemetryData.serial || !telemetryData.name}
        >
          <PlusIcon size={18} />
        </Button>
      </form>
      {telemetries.length > 0 && (
        <ScrollArea className="max-h-[20rem] p-2  border rounded-lg">
          <Table className="w-full text-xs [&_th]:p-3">
            <thead>
              <tr>
                <th>serial</th>
                <th>telemetry</th>
                <th>label</th>
                <th>color</th>
              </tr>
            </thead>
            <tbody>
              {telemetries.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.serial}</td>
                    <td>{item.name}</td>
                    <td>{item.label || item.name}</td>
                    <td>
                      <div className="flex items-center gap-4 justify-between">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-8"
                          onClick={() => {
                            deleteTelemetry(item);
                          }}
                        >
                          <TrashIcon size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </ScrollArea>
      )}
    </div>
  );
}
