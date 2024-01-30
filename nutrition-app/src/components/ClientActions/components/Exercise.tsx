import { FC, useState } from "react";
import { Note, Time } from "../../../common/types";
import TimeInput from "../../shared/Time";
import AddNotes from "../../shared/AddNotes";

type ExerciseDeailsProps = {
  addExercise: (
    exerciseName: string,
    startTime: string,
    sets: number,
    reps: number,
    exerciseTime: Time,
    exerciseNotes: Note[]
  ) => void;
};

const ExerciseDetails: FC<ExerciseDeailsProps> = ({ addExercise }) => {
  const [name, setName] = useState("");
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [time, setTime] = useState<Time>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showExercise, setShowExercise] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const addNotes = (note: string) => {
    const newNote = {
      body: note,
      context: "exercise",
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (index: number) => {
    const newNotes = notes.filter((note, i) => i !== index);
    setNotes(newNotes);
  };

  const updateNote = (index: number, note: string) => {
    const newNotes = notes.map((n, i) => {
      if (i === index) {
        return {
          ...n,
          body: note,
        };
      } else {
        return n;
      }
    });
    setNotes(newNotes);
  };

  return (
    <div className="flex flex-col w-full p-2">
      <button
        type="submit"
        className="w-1/2 p-2 text-white bg-zinc-950 hover:bg-zinc-800"
        onClick={() => setShowExercise(!showExercise)}
      >
        Add Exercise
      </button>

      {showExercise && (
        <>
          <div className="border border-slate-700 rounded p-2 mt-2 mb-2">
            <div className="flex felx-col justify-end">
              <button
                className="text-zinc-950 hover:text-slate-700"
                onClick={() => setShowExercise(!showExercise)}
              >
                X
              </button>
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex flex-col p-2">
                <label
                  htmlFor="exercise"
                  className="text-sm font-semibold mb-1"
                >
                  Exercise
                </label>
                <input
                  type="text"
                  id="exercise"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 border border-slate-300 rounded"
                />
              </div>
              <div className="flex flex-row justify-between p-2">
                <TimeInput time={time} handleChangeTime={setTime} />
                <label htmlFor="sets" className="text-sm font-semibold mb-1">
                  Sets
                </label>
                <input
                  type="number"
                  id="sets"
                  placeholder="0"
                  value={sets}
                  onChange={(e) => setSets(Number(e.target.value))}
                  className="w-8 p-1 text-center"
                />
                <label htmlFor="reps" className="text-sm font-semibold mb-1">
                  Reps
                </label>
                <input
                  type="number"
                  id="reps"
                  placeholder="0"
                  value={reps}
                  onChange={(e) => setReps(Number(e.target.value))}
                  className="w-8 p-1 text-center"
                />
              </div>
            </div>

            {notes.map((note: Note, i: number) => {
              return (
                <AddNotes note={note.body} setNote={updateNote} noteIndex={i} />
              );
            })}

            <div className="flex flex-col w-full items-center">
              <button
                type="submit"
                className="w-full p-2 text-white bg-zinc-950 hover:bg-zinc-800"
                onClick={() =>
                  addExercise(name, startTime, sets, reps, time, notes)
                }
              >
                Add Exercise to Workout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExerciseDetails;
