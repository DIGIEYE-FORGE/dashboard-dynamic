import { Scaling } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useGridStore } from "../../grid-store";

export function ToggleEdit() {
  const { editMode, toggleEditMode } = useGridStore();
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn("hidden xl:flex", {
              "text-foreground": editMode,
              "text-foreground/50": !editMode,
            })}
            onClick={toggleEditMode}
          >
            <Scaling size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side={"bottom-end" as unknown as "bottom"}>
          {editMode ? "exitEditMode" : "enterEditMode"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
