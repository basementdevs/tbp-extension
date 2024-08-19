import { Check } from "lucide-react";
import React, { useState } from "react";

const ColorCustomizer = () => {
  const [selectedColor, setSelectedColor] = useState(1);

  const colors = [
    { id: 0, color: "#8B4513" }, // Brown
    { id: 1, color: "#DC143C" }, // Crimson
    { id: 2, color: "#800080" }, // Purple
    { id: 3, color: "#4169E1" }, // Royal Blue
  ];

  return (
    <div className="flex space-x-4">
      {colors.map((colorObj) => (
        <div key={colorObj.id} className="relative">
          <button
            type="button"
            className={`w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white
                ${selectedColor === colorObj.id ? "ring-2 ring-white" : ""}`}
            style={{ backgroundColor: colorObj.color }}
            onClick={() => setSelectedColor(colorObj.id)}
          />
          {selectedColor === colorObj.id && (
            <div className="absolute -top-1 -right-1 bg-icon-high border-helper-outline rounded-full p-0.5">
              <Check size={12} className="text-elevation-surface font-bold" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ColorCustomizer;
