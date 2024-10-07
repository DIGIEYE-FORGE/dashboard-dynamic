import { useEffect } from "react";
import AddWidget from "./components/add-widget";
import AddWidgetDialog from "./components/add-widget-dialog";
import { Grid } from "./components/grid";
import { SaveDashboard } from "./components/save-dashboard";
import { ToggleEdit } from "./components/toggle-edit";
import { useGridStore } from "./grid-store";

export default function HomePage() {
  const { setLayouts, setWidgets } = useGridStore();
  useEffect(() => {
    const data = window.localStorage.getItem("dashboard");
    if (data) {
      const { layouts, widgets } = JSON.parse(data);
      setLayouts(layouts);
      setWidgets(widgets);
    }
  }, []);
  return (
    <main className="h-full flex-1 flex flex-col px-20 py-6">
      <div className="flex flex-wrap items-center gap-1   w py-2">
        <div className="flex gap-4 items-center ">dashboard</div>
        <div className="flex gap-1 items-center ml-auto">
          <AddWidget />
          <ToggleEdit />
          <SaveDashboard />
        </div>
      </div>
      <Grid />
      <AddWidgetDialog />
    </main>
  );
}
