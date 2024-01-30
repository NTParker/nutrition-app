import React, { useState } from "react";
import MealInput from "./components/MealInput";
import ExerciseInput from "./components/ExerciseInput";
import NotesInput from "./components/NotesInput";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserContext } from "../../context/UserContext";
import Workout from "./components/Workout";
import { Workout as WorkoutType } from "../../common/types";

type LogCategory = "meals" | "exercises" | "notes";

const DailyLogInput: React.FC = () => {
  const { error, isLoading, user } = useAuth0();
  const { userData, userLogData } = useUserContext();

  const { workouts } = userLogData!;

  const [activeCategory, setActiveCategory] = useState<LogCategory | null>(
    null
  );

  const handleCategory = (category: LogCategory) => {
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
    }
  };

  return (
    <div className="border pl-2 pr-2 pt-3 mt-2 rounded border-slate-700 bg-transparent z-50 overflow-y-auto">
      <div className="flex flex-col justify-start items-start space-y-4 w-full">
        <div className="flex flex-row justify-start items-center w-full">
          <h3 className="text-lg font-bold text-white w-full">Daily Log</h3>
          <div className="flex flex-row justify-end items-center w-full">
            {workouts.map((workout: WorkoutType) => {
              return (
                <div className="flex flex-row justify-start items-center w-full">
                  <h2 className="text-xl font-bold text-white">
                    {workout.name}
                  </h2>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col md:space-x-4 w-full">
          <button
            className="p-2 text-white bg-zinc-800 border-black hover:bg-zinc-950 mb-3 w-full sm:w-auto md:w-auto sm:h-auto md:h-auto"
            onClick={() => handleCategory("meals")}
          >
            Meals
          </button>
          {activeCategory === "meals" && <MealInput />}
          <button
            className="p-2 text-white bg-zinc-800 border-black hover:bg-zinc-950 mb-3 w-full md:w-auto"
            onClick={() => handleCategory("exercises")}
          >
            Exercise
          </button>
          {activeCategory === "exercises" && <Workout />}
          <button
            className="p-2 text-white bg-zinc-800 border-black hover:bg-zinc-950 mb-3 w-full md:w-auto"
            onClick={() => handleCategory("notes")}
          >
            Notes
          </button>
          {activeCategory === "notes" && <NotesInput />}
        </div>
      </div>
    </div>
  );
};

export default DailyLogInput;
