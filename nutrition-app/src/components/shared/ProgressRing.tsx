import { FC } from "react";

type ProgressRingProps = {
  radius?: number;
  stroke?: number;
  color: string;
  amount: number;
  goal: number;
  dataType: string;
  unit: string;
};

const ProgressRing: FC<ProgressRingProps> = ({
  color,
  amount,
  goal,
  dataType,
  unit,
  stroke = 8,
  radius = 50,
}) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = (amount / goal) * circumference;

  const strokeDashoffset = amount / goal <= 1 ? circumference - progress : 0;
  const progressColor = amount / goal <= 1 ? color : "red";

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      viewBox={`0 0 ${radius * 2} ${radius * 2 + 20}`}
    >
      <circle
        stroke="#49494A"
        fill="transparent"
        strokeWidth={stroke - stroke * 0.2} // Slightly thinner for background
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={progressColor}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="42%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="14"
        fontFamily="Verdana"
        fill="white"
      >
        {`${amount} ${unit}`}
      </text>
      <text
        x="50%"
        y="87%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="14"
        fontFamily="Verdana"
        fill="white"
      >
        {dataType}
      </text>
    </svg>
  );
};

export default ProgressRing;
