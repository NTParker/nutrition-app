export type UserData = {
  roles: string[];
  createdAt: string;
  SK: string;
  username: string;
  PK: string;
  email: string;
  Type: DbRecord;
  preferences: Preferences;
};

export type DbRecord = "User" | "dailyLog" | "checkin" | "Workout" | "Exercise" | "Meal" | "Note";

export type Preferences = {
  defaultView: string;
};

export type Note = {
  id?: string;
  context: string;
  body: string;
};

export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type Meal = {
  id?: string;
  name: string;
  time: string;
  notes: Note[];
};

export type Exercise = {
  id?: string;
  exercise: string;
  startTime?: string;
  sets?: number | 'n/a';
  reps?: number | 'n/a';
  time?: Time | 'n/a';
  notes: Note[];
};

export type Workout = {
  id?: string;
  name?: string;
  time?: Time;
  exercises: Exercise[];
  notes: Note[];
};

export type DailyLog = {
  id?: string;
  date: string;
  workouts: Workout[];
  notes: Note[];
};
