import { useEffect } from "react";
import AddWidget from "./components/add-widget";
import AddWidgetDialog from "./components/add-widget-dialog";
import { Grid } from "./components/grid";
import { SaveDashboard } from "./components/save-dashboard";
import { ToggleEdit } from "./components/toggle-edit";
import { useGridStore } from "./grid-store";
import useLocalStorage from "@/hooks/use-local-storage";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

const dashboardNameSchema = z.string().default("Dashboard");
export default function HomePage() {
  const { setLayouts, setWidgets } = useGridStore();
  const [dashboardName, setDashboardName] = useLocalStorage(
    "dashboard-name",
    dashboardNameSchema
  );
  useEffect(() => {
    const data = window.localStorage.getItem("dashboard");
    if (data) {
      const { layouts, widgets } = JSON.parse(data);
      setLayouts(layouts);
      setWidgets(widgets);
    }
  }, []);
  return (
    <main className="h-full flex-1 flex flex-col px-[clamp(1.5rem,5vw,5rem)] py-6">
      <div className="group flex flex-wrap items-center gap-1   w py-2">
        <form className="w-72">
          <Input
            value={dashboardName}
            onChange={(e) => {
              setDashboardName(e.target.value);
            }}
            onKeyDown={(e) => {
              const target = e.target as HTMLInputElement;
              if (e.key === "Enter" || e.key === "Escape") {
                target.blur();
              }
            }}
            className="border-none shadow-none font-semibold focus:font-normal"
          />
        </form>
        <div className="flex gap-1 items-center ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
          <AddWidget />
          <ToggleEdit />
          <SaveDashboard />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setLayouts([]);
              setWidgets([]);
            }}
          >
            <Trash2Icon size={20} />
          </Button>
        </div>
      </div>
      <Grid />
      <AddWidgetDialog />
    </main>
  );
}
