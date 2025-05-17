import React from "react";

interface ProgressSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const ProgressSlider: React.FC<ProgressSliderProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="w-full">
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="w-full"
      />
      <p className="text-sm text-gray-600">{value}% Completed</p>
    </div>
  );
};

export default ProgressSlider;
