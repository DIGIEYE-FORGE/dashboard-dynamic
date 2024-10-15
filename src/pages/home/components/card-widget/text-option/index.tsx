import { Widget } from "@/utils";
import Card1 from "../../card-options/cards/card1";

type Data = {
  content?: string;
  icon?: string;
  position: "center" | "left" | "right" | "reverseCenter";
};

export default function TextOptions({ title, attributes }: Widget) {
  const { content, icon, position } = attributes as Data;
  return (
    <>
      <Card1 title={title} content={content} icon={icon} position={position} />
    </>
  );
}
