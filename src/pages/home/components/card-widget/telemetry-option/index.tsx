import { Icon } from "@/components/icon";
import { useAddWidgetStore } from "@/pages/home/widget-store";
import { Widget } from "@/utils";
import axios from "axios";
import { Loader } from "lucide-react";
import useSWR from "swr";

type Data = {
  icon?: string;
  telemetryName?: string;
};

export default function CardWidget({
  title,
  attributes,
  apiUrl,
  token,
}: Widget) {
  const { telemetryName, icon } = attributes as Data;

  const { data, isLoading, error } = useSWR(apiUrl, async () => {
    if (!apiUrl) return;
    const { data } = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  });

  if (isLoading)
    return (
      <main className="grid place-content-center text-xs">
        <Loader />
      </main>
    );
  if (error)
    return (
      <main className="grid place-content-center  text-foreground/50">
        {"somethingError"}
      </main>
    );

  return (
    <div className="flex justify-between items-center   overflow-hidden  w-full h-full">
      <div className="flex gap-2 flex-col  capitalize">
        <span className="font-semibold">{title}</span>
        <span className="first-letter:uppercase truncate">
          {JSON.stringify(data)}
          {/*{JSON.stringify(title)} */}
          {/* {(telemetryName &&
            stringify(
              flatten({
                [name!]: telemetry?.value,
              })?.[telemetryName]
            )) ||
            "---"} */}
        </span>
      </div>
      {icon && <Icon name={icon} size={52} strokeWidth={1.5} />}
    </div>
  );
}
