import { useState } from "react";

interface PaginationProps {
  data: any;
  setOffset: any;
  setPage: any;
  offset: any;
  page: any;
  productsPerPage: any;
  isAll?: boolean;
}

export function Pagination({
  data,
  setOffset,
  setPage,
  offset,
  page,
  productsPerPage,
  isAll
}: PaginationProps) {

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  let nextPage = !isAll ? data?.pagination.pageInfo.hasNextPage : data?.all.pageInfo.hasNextPage
  let previousPage = !isAll ? data?.pagination.pageInfo.hasPreviousPage : data?.all.pageInfo.hasPreviousPage
  let count = !isAll ? data?.pagination.aggregate.count : data?.all.aggregate.count
  
  const handlePreviousPage = () => {
    setIsButtonDisabled(true);

 
    if (data && previousPage) {
      setOffset(offset - productsPerPage);
      setPage(page - 1);

      setTimeout(() => {
        setIsButtonDisabled(false)
      }, 300)
    }
  }


  const handleNextPage = () => {
    setIsButtonDisabled(true);

    if (data && nextPage) {
      setOffset(offset + productsPerPage);
      setPage(page + 1);

      setTimeout(() => {
        setIsButtonDisabled(false)
      }, 300)
    }
  }

  return (
    <div className="px-5 pt-5 flex flex-col xs:flex-row items-center xs:justify-between          ">
      <span
        className={`text-xs xs:text-sm text-gray-500 ${
          count <= 10 && "opacity-30"
        }`}
      >
        {`Page ${page}`}
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={handlePreviousPage}
          disabled={isButtonDisabled}
          className={`text-sm text-white transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l ${
            !previousPage &&
            "opacity-20 cursor-default hover:bg-indigo-600"
          }`}
        >
          Prev
        </button>
        &nbsp; &nbsp;
        <button
          onClick={handleNextPage}
          disabled={isButtonDisabled}
          className={`text-sm text-white transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r  ${
            !nextPage &&
            "opacity-20 cursor-default hover:bg-indigo-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
