"use client";
import React from "react";

interface ColorSelectorProps {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  backgroundColor,
  setBackgroundColor,
}) => {
  const colors = [
    "blue",
    "teal",
    "cyan",
    "fuchsia",
    "yellow",
    "orange",
    "purple",
    "green",
  ];

  return (
    <div>
      <p className="text-sm">Background Color</p>
      <div className="mt-2 flex gap-2 border p-2">
        {colors.map((color) => (
          <button
            key={color}
            className="h-6 w-6 rounded-full"
            style={{ backgroundColor: color }}
            onClick={() => setBackgroundColor(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
