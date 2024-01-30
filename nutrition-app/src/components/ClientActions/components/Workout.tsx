import { useState } from "react";
import { Exercise, Note, Time } from "../../../common/types";
import ExerciseDetails from "./Exercise";

const Workout = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [exerciseNotes, setExerciseNotes] = useState<Note[]>([]);
  const [startTime, setStartTime] = useState("");
  const [exerciseType, setExerciseType] = useState("reps");
  const [showWorkout, setShowWorkout] = useState(false);
  const [time, setTime] = useState<Time>({ hours: 0, minutes: 0, seconds: 0 });
  const [notes, setNotes] = useState("");

  const addExercise = (
    exercise: string,
    startTime: string,
    sets: number,
    reps: number,
    time: Time,
    notes: Note[]
  ) => {
    const newExercise = {
      exercise,
      startTime,
      sets,
      reps,
      time,
      notes,
    };
    setExercises([...exercises, newExercise]);
  };

  const deleteExercise = (index: number) => {
    const newExercises = exercises.filter((exercise, i) => i !== index);
    setExercises(newExercises);
  };

  return (
    <div className="flex flex-col w-full justify-start p-2 mt-2 mb-2">
      <button
        type="submit"
        className="w-1/2 p-2 text-white bg-zinc-950 hover:bg-zinc-800"
        onClick={() => setShowWorkout(!showWorkout)}
      >
        Add Workout
      </button>
      {showWorkout && (
        <div className="border border-slate-700 rounded p-2 mt-2 mb-2">
          <div className="flex flex-col justify-between w-full p-2">
            <div className="flex felx-col justify-end">
              <button
                className="text-zinc-950 hover:text-slate-700"
                onClick={() => setShowWorkout(!showWorkout)}
              >
                X
              </button>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <label
                  htmlFor="workoutName"
                  className="text-sm font-semibold mb-1"
                >
                  Workout Name
                </label>
                <input
                  type="text"
                  id="workoutName"
                  value={workoutName}
                  onChange={(e) => setWorkoutName(e.target.value)}
                  className="w-4/5"
                />
              </div>

              <div className="flex flex-row space-x-2">
                <div className="flex flex-col">
                  <label htmlFor="time" className="text-sm font-semibold mb-1">
                    Time
                  </label>
                  <div className="flex flex-row">
                    <input
                      type="number"
                      id="time"
                      name="hours"
                      value={time.hours}
                      onChange={(e) =>
                        setTime({ ...time, hours: parseInt(e.target.value) })
                      }
                      className="w-10 h-10"
                      placeholder="00"
                    />
                    <span className="text-sm">:</span>
                    <input
                      type="text"
                      id="time"
                      value={time.minutes}
                      onChange={(e) =>
                        setTime({ ...time, minutes: parseInt(e.target.value) })
                      }
                      className="w-10 h-10"
                      placeholder="00"
                    />
                    <span className="text-sm">:</span>
                    <input
                      type="text"
                      id="time"
                      value={time.seconds}
                      onChange={(e) =>
                        setTime({ ...time, seconds: parseInt(e.target.value) })
                      }
                      className="w-10 h-10"
                      placeholder="00"
                    />
                  </div>
                </div>
              </div>
            </div>
            <ExerciseDetails addExercise={addExercise} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Workout;
