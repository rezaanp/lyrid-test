"use client";
import { useCallback } from "react";

const Table = ({
  columns,
  datas,
  pageIndex,
  setPageIndex,
  totalData,
  setSearch,
  numberOfPages,
}) => {
  //FUNCTIONS
  const handleChangeSearch = useCallback((event) => {
    setSearch && setSearch(event?.target?.value);
    setPageIndex && setPageIndex(0);
  }, []);

  const handlePreviousPage = useCallback(() => {
    setPageIndex((current) => current - 1);
  }, []);

  const handleNextPage = useCallback(() => {
    setPageIndex && setPageIndex((current) => current + 1);
  }, []);

  return (
    <>
      {/* INPUT SEARCH */}
      <div>
        <div className="d-flex w-100 justify-content-end mb-3">
          <div>
            <input
              onChange={handleChangeSearch}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
        </div>
      </div>
      <div>
        <table className="w-100">
          <thead>
            <tr>
              {columns?.map((e, i) => (
                <th className="whitespace-nowrap" key={i}>
                  {e?.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {datas?.length ? (
              datas?.map((data, index) => (
                <tr key={index}>
                  {columns?.map((column, i) => (
                    <td key={i} className="py-2">
                      {column?.component ? (
                        <column.component data={data} />
                      ) : (
                        data[column.key ?? ""]
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="text-center border-2 py-5"
                  colSpan={columns?.length ?? 0 + 1}
                >
                  Data Doesn't Exist
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mt-3">
          <div className="pagination justify-content-end">
            <button
              type="button"
              disabled={!pageIndex}
              onClick={handlePreviousPage}
              className={`${Boolean(!pageIndex) && "disabled"} btn btn-primary`}
            >
              Previous
            </button>
            <li>
              <span className="mx-2">
                {`${pageIndex + 1}-${numberOfPages || 0} of ${totalData || 0}`}
              </span>
            </li>
            <button
              disabled={Boolean(pageIndex + 1 >= numberOfPages)}
              onClick={handleNextPage}
              className={`${
                Boolean(pageIndex + 1 >= numberOfPages) && "disabled"
              } btn btn-primary`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
