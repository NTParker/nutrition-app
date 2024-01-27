import React, { useState } from "react";

const NotesInput: React.FC = () => {
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="note"
          className="block text-sm font-medium text-gray-700"
        >
          Note
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          rows={4}
          placeholder="Enter your notes here"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Submit Note
      </button>
    </form>
  );
};

export default NotesInput;
