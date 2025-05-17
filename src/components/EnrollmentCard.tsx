import React from "react";

interface EnrollmentProgressProps {
  title: string;
  progress: number;
  status: "enrolled" | "completed";
  onProgressChange: (newProgress: number) => void;
}

const EnrollmentProgress: React.FC<EnrollmentProgressProps> = ({
  title,
  progress,
  status,
  onProgressChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    onProgressChange(value);
  };

  return (
    <div className="border rounded p-4 mb-4 shadow-sm bg-white">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <label htmlFor={`progress-${title}`} className="block mb-1">
        Progress: {progress}%
      </label>
      <input
        id={`progress-${title}`}
        type="range"
        min={0}
        max={100}
        value={progress}
        onChange={handleChange}
        className="w-full"
        disabled={status === "completed"}
      />
      {status === "completed" && (
        <p className="text-green-600 font-medium mt-2">Completed</p>
      )}
    </div>
  );
};

export default EnrollmentProgress;
