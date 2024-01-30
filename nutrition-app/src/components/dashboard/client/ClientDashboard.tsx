import { FC, useState } from "react";
import DailyLogInput from "../../ClientActions/DailyLog";
import Footer from "../components/Footer";
import usePage from "../hooks/usePage";
import Calendar from "../../ClientActions/Calendar";
import Goals from "../../ClientActions/Goals";
import MacroRingGroup from "../../ClientActions/components/MacroRingGroup";
import { useClientContext } from "../../../context/ClientContext";
import { measurementColors } from "../../../common/constants";
import { getCalories } from "../../ClientActions/utils/utils";

const ClientDashboard: FC = () => {
  const { values, handlers } = useClientContext();
  const { dailyProteinGoal, dailyCarbsGoal, dailyFatGoal } = values;

  const rings = (
    [
      "calories",
      "protein",
      "carbs",
      "fat",
    ] as (keyof typeof measurementColors)[]
  ).map((ring) => {
    const amount = values[`total${ring[0].toUpperCase() + ring.slice(1)}`];
    const goal =
      ring !== "calories"
        ? values[`daily${ring[0].toUpperCase() + ring.slice(1)}Goal`]
        : getCalories(dailyProteinGoal, dailyCarbsGoal, dailyFatGoal);
    return {
      dataType: ring,
      amount,
      goal,
    };
  });

  return (
    <div className="container mx-auto pl-2 pr-4 bg-zinc-900 shadow-md justify-center items-center w-full max-w-full h-dvh max-h-dvh sm:w-full sm:max-w-full md:w-full md:max-w-full sm:h-dvh sm:max-h-dvh md:h-dvh md:max-h-dvh">
      <MacroRingGroup rings={rings} />
      <Calendar />
      <Goals />
      <DailyLogInput />
    </div>
  );
};
// <div className="container w-full bg-slate-950 text-center">
//   <div className="flex justify-center items-center space-x-4">
//     {/* <Footer /> */}
//   </div>
// </div>

export default ClientDashboard;
