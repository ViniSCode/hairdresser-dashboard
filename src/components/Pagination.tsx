interface PaginationProps {
  data: any, 
  setOffset: any, 
  setPage: any, 
  offset: any, 
  page: any, 
  productsPerPage: any
}


export function Pagination ({data, setOffset, setPage, offset, page, productsPerPage}: PaginationProps) {
  return (
    <div className="px-5 pt-5 flex flex-col xs:flex-row items-center xs:justify-between          ">
      <span className="text-xs xs:text-sm text-gray-500">
        {`Page ${page}`}
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button 
          onClick={() => {
            if (data?.pagination.pageInfo.hasPreviousPage) {
              setOffset(offset - productsPerPage);
              setPage(page - 1);
            }
          }}
          className={`text-sm text-white transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l ${!data?.pagination.pageInfo.hasPreviousPage && 'opacity-20 cursor-default hover:bg-indigo-600'}`}
        >
          Prev
        </button>
        &nbsp; &nbsp;
        <button 
           onClick={() => {
            if (data?.pagination.pageInfo.hasNextPage) {
              setOffset(offset + productsPerPage);
              setPage(page + 1);
            }
          }}
          className={`text-sm text-white transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r  ${!data?.pagination.pageInfo.hasNextPage && 'opacity-20 cursor-default hover:bg-indigo-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  )
}