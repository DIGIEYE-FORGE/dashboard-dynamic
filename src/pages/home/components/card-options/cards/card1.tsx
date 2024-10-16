import { Icon } from "@/components/icon";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function Card1({
  position,
  icon,
  content,
  title,
  backgroundColor,
  color,
  isUrl,
}: {
  position: "center" | "left" | "right" | "reverseCenter";
  icon?: string;
  content?: string;
  title?: string;
  backgroundColor?: string;
  color?: string;
  isUrl?: boolean;
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
        backgroundColor,
        color,
      }}
    >
      {!icon ? (
        <Skeleton className="rounded-full [animation-play-state:paused] size-12 shrink-0" />
      ) : isUrl ? (
        <img src={icon} alt="icon" className="size-14 object-contain" />
      ) : (
        <Icon name={icon} strokeWidth={1.5} className="shrink-0 size-14" />
      )}
      <div
        className={cn("flex flex-col gap-2 flex-1 ", {
          "items-center h-1 w-full":
            position === "center" || position === "reverseCenter",
          "items-start w-1": position === "left" || position === "right",
        })}
      >
        {title ? (
          <h3 className="text-xl first-letter:uppercase font-semibold">
            {title}
          </h3>
        ) : (
          <Skeleton className="rounded-full [animation-play-state:paused] w-full h-6" />
        )}
        {content ? (
          <p className="opacity-75 text-lg first-letter:uppercase truncate max-w-full">
            {content}
          </p>
        ) : (
          <Skeleton className="rounded-full [animation-play-state:paused] w-full h-4" />
        )}
      </div>
    </Card>
  );
}

export default Card1;
