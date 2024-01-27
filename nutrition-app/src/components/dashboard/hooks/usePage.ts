import { useState } from "react";

const usePage = () => {
  const [currentPage, setCurrentPage] = useState("log");

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  return { currentPage, handlePageChange };
}

export default usePage;