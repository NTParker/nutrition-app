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

export type DbRecord = "User" | "dailyLog" | "checkin";
export type Preferences = {
  defaultView: string;
};
