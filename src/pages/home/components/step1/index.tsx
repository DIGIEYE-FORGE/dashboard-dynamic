import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import WidgetLogo from "../widget-logo";
import { useAddWidgetStore } from "../../widget-store";
import { useGridStore } from "../../grid-store";
import WidgetTypeSelector from "../widget-type-selector";
import { Textarea } from "@/components/ui/textarea";

export function Step1() {
  const { data, setTitle, setApiUrl, setToken } = useAddWidgetStore();
  const { widgetId } = useGridStore();
  return (
    <div className="place-content-center ">
      <Label>title</Label>
      <Input
        autoFocus
        id="title"
        name="title"
        value={data.title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Label className="inline-block mt-4">api url</Label>
      <Input
        id="apiUrl"
        name="apiUrl"
        value={data.apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
      />

      <Label className="inline-block mt-4">
        token <span className="text-xs">(optional)</span>
      </Label>
      <Textarea
        id="token"
        name="token"
        value={data.token}
        onChange={(e) => setToken(e.target.value)}
      />
      <Label className="mt-4 inline-block">charType</Label>
      {widgetId == "new" ? (
        <WidgetTypeSelector />
      ) : (
        <WidgetLogo
          type={data.type}
          className=" bg-transparent py-4 [&>*]:mx-auto  [&>*]:w-32 mt-2   mx-auto"
        />
      )}
    </div>
  );
}
