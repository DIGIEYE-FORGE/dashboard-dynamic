import { Widget } from "@/utils";
import Card1 from "../../card-options/cards/card1";

type Data = {
  content?: string;
  icon?: string;
  position: "center" | "left" | "right" | "reverseCenter";
  isUrl?: boolean;
};

export default function TextOptions({
  title,
  backgroundColor,
  color,
  attributes,
}: Widget) {
  const { content, icon, position, isUrl } = attributes as Data;
  return (
    <>
      <Card1
        backgroundColor={backgroundColor}
        color={color}
        title={title}
        content={content}
        icon={icon}
        position={position}
        isUrl={isUrl}
      />
    </>
  );
}
