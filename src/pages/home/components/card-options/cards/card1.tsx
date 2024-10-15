import { Icon } from "@/components/icon";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function Card1({
  position,
  icon,
  content,
  title,
}: {
  position: "center" | "left" | "right" | "reverseCenter";
  icon?: string;
  content?: string;
  title?: string;
}) {
  return (
    <Card
      className="flex  items-center justify-center gap-5 p-4  w-full h-full"
      style={{
        flexDirection:
          position === "center"
            ? "column"
            : position === "reverseCenter"
            ? "column-reverse"
            : position === "left"
            ? "row"
            : (position === "right" && "row-reverse") || "row",
        justifyContent:
          position === "center" || position == "reverseCenter"
            ? "center"
            : "flex-start",
      }}
    >
      {!icon ? (
        <Skeleton className="rounded-full [animation-play-state:paused] w-12 h-12" />
      ) : (
        <Icon name={icon} size={52} strokeWidth={1.5} />
      )}
      <div
        className={cn("flex flex-col gap-2 w-full ", {
          "items-center": position === "center" || position === "reverseCenter",
          "items-start": position === "left" || position === "right",
        })}
      >
        {title ? (
          <h3 className="text-lg font-semibold">{title}</h3>
        ) : (
          <Skeleton className="rounded-full [animation-play-state:paused] w-full h-6" />
        )}
        {content ? (
          <p className="text-sm text-gray-300">{content}</p>
        ) : (
          <Skeleton className="rounded-full [animation-play-state:paused] w-full h-4" />
        )}
      </div>
    </Card>
  );
}

export default Card1;
