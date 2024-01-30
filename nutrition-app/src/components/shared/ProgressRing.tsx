import { FC } from "react";

type ProgressRingProps = {
  radius?: number;
  stroke?: number;
  showAmount?: boolean;
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
  showAmount = true,
}) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  console.log("amount: ", amount);
  console.log("goal: ", goal);

  const progress = (amount / goal) * circumference;
  const strokeDashoffset =
    goal !== 0 && amount / goal <= 1 ? circumference - progress : 0;
  const progressColor =
    goal !== 0 && amount / goal <= 1
      ? color
      : goal === 0
      ? "transparent"
      : "#FF0000";

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      viewBox={`0 0 ${radius * 2} ${showAmount ? radius * 2 + 20 : radius * 2}`}
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
      {showAmount ? (
        <>
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
        </>
      ) : null}
    </svg>
  );
};

export default ProgressRing;
