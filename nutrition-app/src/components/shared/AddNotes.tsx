import { FC, useState } from "react";

type AddNotesProps = {
  note: string;
  noteIndex: number;
  setNote: (i: number, note: string) => void;
};

const AddNotes: FC<AddNotesProps> = ({ note, noteIndex, setNote }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col p-2">
      <label
        htmlFor="note"
        className="text-sm font-semibold mb-1"
        onClick={() => setOpen(!open)}
      >
        Desc/Notes
        <br />
        <span className="text-xs text-gray-500">(click to add)</span>
      </label>
      {open ? (
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(noteIndex, e.target.value)}
          className="p-2 border border-slate-300 rounded"
          rows={3}
        />
      ) : null}
    </div>
  );
};

export default AddNotes;
