import React, { useState } from "react";

const ExerciseInput: React.FC = () => {
  const [Exercise, setExercise] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Exercise Name, Description, and Note inputs */}
      {/* ... */}
      <button
        type="submit"
        className="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Submit Exercise
      </button>
    </form>
  );
};

export default ExerciseInput;
