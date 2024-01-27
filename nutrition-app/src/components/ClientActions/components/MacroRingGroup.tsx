import {
  caloriesColor,
  carbColor,
  fatColor,
  proteinColor,
} from "../../../common/constants";
import ProgressRing from "../../shared/ProgressRing";

const MacroRingGroup = () => {
  const protein = 101;
  const proteinGoal = 150;
  const proteinPercent = protein / proteinGoal;
  const fat = 49;
  const fatGoal = 50;
  const fatPercent = fat / fatGoal;
  const carbs = 90;
  const carbsGoal = 110;
  const carbsPercent = carbs / carbsGoal;

  const calories = protein * 4 + fat * 9 + carbs * 4;
  const caloriesGoal = proteinGoal * 4 + fatGoal * 9 + carbsGoal * 4;

  return (
    <div className="flex flex-row justify-center">
      <ProgressRing
        dataType="calories"
        amount={calories}
        goal={caloriesGoal}
        unit=""
        color={caloriesColor}
      />
      <ProgressRing
        dataType="protein"
        amount={protein}
        goal={proteinGoal}
        unit="g"
        color={proteinColor}
      />
      <ProgressRing
        dataType="fat"
        amount={fat}
        goal={fatGoal}
        unit="g"
        color={fatColor}
      />
      <ProgressRing
        dataType="carbs"
        amount={carbs}
        goal={carbsGoal}
        unit="g"
        color={carbColor}
      />
    </div>
  );
};

export default MacroRingGroup;
