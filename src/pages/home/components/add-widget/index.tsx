import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import { useGridStore } from "../../grid-store";

export default function AddWidget() {
  const { setWidgetId } = useGridStore();
  return (
    <Button variant="ghost" size="icon" onClick={() => setWidgetId("new")}>
      <PlusSquare size={20} />
    </Button>
  );
}
