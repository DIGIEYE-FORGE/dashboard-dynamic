import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import WidgetLogo from "../widget-logo";
import { useAddWidgetStore } from "../../widget-store";
import { useGridStore } from "../../grid-store";
import WidgetTypeSelector from "../widget-type-selector";
import { Textarea } from "@/components/ui/textarea";
import ColorPicker from "@/components/color-picker";

export function Step1() {
  const { data, setTitle, setApiUrl, setToken, setBackgroundColor, setColor } =
    useAddWidgetStore();
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
      <Label className="inline-block mt-4">colors</Label>
      <div className="grid grid-cols-2">
        <div className="flex items-center gap-2">
          <Label>
            Background <span className="text-xs">(optional)</span>
          </Label>
          <ColorPicker
            className="w-8 aspect-video rounded-sm"
            color={data.backgroundColor}
            onChange={setBackgroundColor}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label>
            Text <span className="text-xs">(optional)</span>
          </Label>
          <ColorPicker
            className="w-8 aspect-video rounded-sm"
            color={data.color}
            onChange={setColor}
          />
        </div>
      </div>
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
