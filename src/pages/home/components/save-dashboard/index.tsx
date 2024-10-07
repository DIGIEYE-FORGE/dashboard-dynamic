import { Save } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useGridStore } from "../../grid-store";

export function SaveDashboard() {
  const { isUpdated, layouts, widgets, setEditMode, setUpdated } =
    useGridStore();

  const save = () => {
    window.localStorage.setItem(
      "dashboard",
      JSON.stringify({ layouts, widgets })
    );
    setEditMode(false);
    setUpdated(false);
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            disabled={!isUpdated}
            variant="ghost"
            size="icon"
            className={cn("", {
              "text-foreground": isUpdated,
              "text-gray-500/50 pointer-events-none": !isUpdated,
            })}
            onClick={save}
          >
            <Save size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side={"bottom-end" as unknown as "bottom"}>
          Save
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
