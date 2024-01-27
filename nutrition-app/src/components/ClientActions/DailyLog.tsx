import React, { useState } from "react";
import MealInput from "./components/MealInput";
import ExerciseInput from "./components/ExerciseInput";
import NotesInput from "./components/NotesInput";
import MacroRingGroup from "./components/MacroRingGroup";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserContext } from "../../context/UserContext";

type LogCategory = "meals" | "exercises" | "notes";

const DailyLogInput: React.FC = () => {
  const { error, isLoading, user } = useAuth0();
  const { userData } = useUserContext();
  const [activeCategory, setActiveCategory] = useState<LogCategory | null>(
    null
  );

  return (
    <div className="border pl-2 pr-2 mt-2 rounded border-slate-700 bg-transparent z-50">
      <MacroRingGroup />
      {activeCategory === "meals" && <MealInput />}
      {activeCategory === "exercises" && <ExerciseInput />}
      {activeCategory === "notes" && <NotesInput />}
      <div className="flex flex-col justify-start items-start space-y-4 w-full">
        <div className="flex flex-col md:space-x-4 w-full">
          <button
            className="p-2 text-white bg-zinc-800 border-black hover:bg-zinc-950 mb-3 w-full sm:w-auto md:w-auto sm:h-auto md:h-auto"
            onClick={() => setActiveCategory("meals")}
          >
            Add Meal
          </button>
          <button
            className="p-2 text-white bg-zinc-800 border-black hover:bg-zinc-950 mb-3 w-full md:w-auto"
            onClick={() => setActiveCategory("exercises")}
          >
            Add Exercise
          </button>
          <button
            className="p-2 text-white bg-zinc-800 border-black hover:bg-zinc-950 mb-3 w-full md:w-auto"
            onClick={() => setActiveCategory("notes")}
          >
            Add Notes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyLogInput;
