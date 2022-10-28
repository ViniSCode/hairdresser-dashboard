export function TablePagination () {
  return (
    <div className="px-5 pt-5 flex flex-col xs:flex-row items-center xs:justify-between          ">
      <span className="text-xs xs:text-sm text-gray-500">
        Showing 1 to 4 of 50 Entries
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button className="text-sm text-white transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
          Prev
        </button>
        &nbsp; &nbsp;
        <button className="text-sm text-white transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
          Next
        </button>
      </div>
    </div>
  )
}