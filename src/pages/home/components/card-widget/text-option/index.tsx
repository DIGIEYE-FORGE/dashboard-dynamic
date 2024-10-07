import { Widget } from "@/utils";
import { Icon } from "@/components/icon";

type Data = {
  content?: string;
  icon?: string;
};

export default function TextOptions({ title, attributes }: Widget) {
  const { content, icon } = attributes as Data;
  return (
    <div className="flex justify-between items-center   overflow-hidden  w-full h-full">
      <div className="flex gap-2 flex-col  capitalize">
        <span className="font-semibold">{title}</span>
        <span className="first-letter:uppercase">{content}</span>
      </div>
      {icon && <Icon name={icon} size={52} strokeWidth={1.5} />}
    </div>
  );
}
