import { useDashboardContext } from "../../../context/DashboardContext";

const Header = () => {
  const { currentPage, handlePageChange, currentView, handleViewChange } =
    useDashboardContext();
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 w-full h-16 max-w-full max-h-16 sm:w-full sm:max-w-full md:w-full md:max-w-full sm:h-16 sm:max-h-16 md:h-16 md:max-h-16 dark:bg-slate-950 text-center flex flex-col justify-end">
        <div className="flex justify-end pr-4">
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {currentView === "client" ? "Client" : "Coach"}
          </span>
          <label className="relative inline-flex items-center cursor-pointer ml-1">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onClick={() => handleViewChange(currentView)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <h1 className="text-2xl font-bold text-slate-50">{currentPage}</h1>
      </div>
      <div
        className="pt-16
      "
      />
      {/* <div className="fixed h-16 w-full max-w-lg dark:bg-slate-950 border-red-600" /> */}
      {/* </div> */}
    </>
  );
};

export default Header;
