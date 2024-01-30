import { useState, FC, useEffect } from "react";
import { useUserContext } from "../../../context/UserContext";
import ProgressRing from "../../shared/ProgressRing";
import { measurementColors } from "../../../common/constants";
import { useClientContext } from "../../../context/ClientContext";
import AddNotes from "../../shared/AddNotes";

type Macros = {
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
};

const MealInput: FC = () => {
  const { userData } = useUserContext();
  const { values, handlers } = useClientContext();

  const { dailyProteinGoal, dailyCarbsGoal, dailyFatGoal, dailyFiberGoal } =
    values;

  const [meal, setMeal] = useState("");
  const [macros, setMacros] = useState<Macros>({
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [note, setNote] = useState("");
  const [openNote, setOpenNote] = useState(false);

  const handleMacroChange = (macro: keyof Macros, value: number) => {
    setMacros({ ...macros, [macro]: value });
  };

  const handleAddMeal = () => {};

  return (
    <div className="flex flex-col space-y-4 mb-4">
      <div className="flex flex-col">
        <label htmlFor="mealName" className="text-sm font-semibold mb-1">
          Meal
        </label>
        <div className="relative flex justify-start">
          <select
            id="mealName"
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
            className="appearance-none p-2 w-1/2"
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
        </div>
      </div>

      <div className="flex justify-around content-around space-x-2 max-w-full">
        {[
          "protein" as keyof Macros,
          "carbs" as keyof Macros,
          "fat" as keyof Macros,
          "fiber" as keyof Macros,
        ].map((macro) => (
          <div className="flex">
            <div
              key={macro}
              className="flex flex-col justify-center items-center"
            >
              <ProgressRing
                color={
                  measurementColors[macro] as keyof typeof measurementColors
                }
                amount={macros[macro]!}
                goal={
                  values[`daily${macro[0].toUpperCase() + macro.slice(1)}Goal`]
                }
                dataType={macro}
                unit=""
                showAmount={false}
                stroke={4}
                radius={30}
              />
              <input
                type="number"
                id={macro}
                placeholder="0"
                value={macros[macro]}
                onChange={(e) =>
                  handleMacroChange(
                    macro as keyof Macros,
                    Number(e.target.value)
                  )
                }
                className="w-10 p-1 text-center"
              />
              <label htmlFor={macro} className="text-sm font-semibold mr-1">
                {`${macro} `}
                <span className="text-xs text-gray-500">(g)</span>
              </label>
            </div>
          </div>
        ))}
      </div>
      <AddNotes note={note} setNote={setNote} />
      {/* <div className="flex flex-col">
        <label
          htmlFor="note"
          className="text-sm font-semibold mb-1"
          onClick={() => setOpenNote(!openNote)}
        >
          Desc/Notes
          <br />
          <span className="text-xs text-gray-500">(click to add)</span>
        </label>
        {openNote ? (
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="p-2 border border-slate-300 rounded"
            rows={3}
          />
        ) : null}
      </div> */}
      <div className="flex flex-col w-full items-center">
        <button
          type="submit"
          className="w-1/2 p-2 text-white bg-zinc-950 hover:bg-zinc-800"
          onClick={() => handleAddMeal()}
        >
          Add Meal
        </button>
      </div>
    </div>
  );
};

export default MealInput;
