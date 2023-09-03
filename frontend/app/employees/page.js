"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Table from "../_components/Table";
import { useGetEmployees } from "../_hooks/index";
import { useDebounce } from "use-debounce";
import ProtectedComponent from "../_components/ProtectedComponent";
import { DELETE } from "../_services/api";

const columns = (handleDelete) => [
  { title: "Name", key: "name" },
  { title: "Role", key: "role" },
  { title: "Salary", key: "salary" },
  { title: "Age", key: "age" },
  {
    title: "Action",
    component: ({ data }) => (
      <div className="d-flex gap-3">
        <Link href={`users/${data?.uuid}`}>
          <button type="button" className="btn btn-info">
            View Details
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDelete(data?.uuid)}
        >
          Delete
        </button>
      </div>
    ),
  },
];

const page = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [searchDebounce] = useDebounce(search, 300);
  const { data: employees, refetc } = useGetEmployees({
    search: searchDebounce,
    pageIndex,
  });

  const deleteEmployee = async (uuid) => {
    await DELETE(`/employees/${uuid}`);
  };

  const handleDelete = async (uuid) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      try {
        await deleteEmployee(uuid);
      } catch (error) {}
    }
  };

  return (
    <ProtectedComponent>
      <div className="container mt-5">
        <div className="d-flex flex-column justify-content-center h-100">
          <h4>EMPLOYEES PAGE</h4>
          <Table
            columns={columns(handleDelete)}
            datas={employees?.data}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            setSearch={setSearch}
            totalData={employees?.total}
            numberOfPages={employees?.numberOfPages}
          />
        </div>
      </div>
    </ProtectedComponent>
  );
};

export default page;
