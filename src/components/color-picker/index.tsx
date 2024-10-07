import { ColorResult, SketchPicker } from "react-color";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { presetColors } from "./data";

interface Props {
  className?: string;
  color?: string;
  onChange?: (color: string) => void;
}

export default function ColorPicker({ className, color, onChange }: Props) {
  const handleChange = (color: ColorResult) => {
    onChange?.(color.hex);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn("outline outline-2 outline-gray-500", className)}
          style={{
            backgroundColor: color,
          }}
        ></div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[9999]" align="start">
        <SketchPicker
          presetColors={presetColors}
          color={color}
          onChange={handleChange}
        />
      </PopoverContent>
    </Popover>
  );
}
