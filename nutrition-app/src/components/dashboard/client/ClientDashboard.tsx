import { FC, useState } from "react";
import DailyLogInput from "../../ClientActions/DailyLog";
import Footer from "../components/Footer";
import usePage from "../hooks/usePage";
import Calendar from "../../ClientActions/Calendar";
import GoalsList from "../../ClientActions/Goals";

const ClientDashboard: FC = () => {
  return (
    <div className="container mx-auto pl-2 pr-4 bg-zinc-900 shadow-md justify-center items-center w-full max-w-full h-dvh max-h-dvh sm:w-full sm:max-w-full md:w-full md:max-w-full sm:h-dvh sm:max-h-dvh md:h-dvh md:max-h-dvh">
      <Calendar />
      <GoalsList />
      <DailyLogInput />
    </div>
  );
};
// <div className="container w-full bg-slate-950 text-center">
//   <div className="flex justify-center items-center space-x-4">
//     {/* <Footer /> */}
//   </div>
// </div>

export default ClientDashboard;
