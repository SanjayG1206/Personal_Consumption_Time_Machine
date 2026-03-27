interface ProgressCircleProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  color?: string;
}

export const ProgressCircle = ({
  value,
  max,
  size = 120,
  strokeWidth = 10,
  label,
  color = "#10b981",
}: ProgressCircleProps) => {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-900">{Math.round(value)}</span>
        {label && <span className="text-xs text-gray-500 mt-1">{label}</span>}
      </div>
    </div>
  );
};
