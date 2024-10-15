import { flatten, Widget } from "@/utils";
import axios from "axios";
import { Loader } from "lucide-react";
import useSWR from "swr";
import Card1 from "../../card-options/cards/card1";

type Data = {
  icon?: string;
  telemetryName?: string;
  position: "center" | "left" | "right" | "reverseCenter";
};

export function stringify(value: unknown) {
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

export default function CardWidget({
  title,
  attributes,
  apiUrl,
  token,
}: Widget) {
  const { telemetryName, icon, position } = attributes as Data;

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
    <Card1
      title={title}
      content={
        (telemetryName && stringify(flatten(data)?.[telemetryName])) || "---"
      }
      icon={icon}
      position={position}
    />
  );
}
