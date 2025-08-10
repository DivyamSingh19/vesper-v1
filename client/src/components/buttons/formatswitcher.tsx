"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface FormatSwitcherProps {
  format: string;
  setFormat: (val: string) => void;
  className?: string;
}

const FormatSwitcher = ({
  format,
  setFormat,
  className,
}: FormatSwitcherProps) => {
  return (
    <ToggleGroup
      type="single"
      value={format}
      onValueChange={(val) => val && setFormat(val)}
      className={`${className}`}
    >
      <ToggleGroupItem value="12h" className="px-4 py-1">
        12h
      </ToggleGroupItem>
      <ToggleGroupItem value="24h" className="px-4 py-1">
        24h
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default FormatSwitcher;
