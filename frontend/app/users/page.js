"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Table from "../_components/Table";
import { useGetUsers } from "../_hooks/index";
import { useDebounce } from "use-debounce";
import ProtectedComponent from "../_components/ProtectedComponent";
import { DELETE } from "../_services/api";

const columns = (handleDelete) => [
  { title: "Name", key: "name" },
  { title: "username", key: "username" },
  {
    title: "Date Created",
    component: ({ data }) => <p>{data?.createdAt.substring(0, 10)}</p>,
  },
  {
    title: "Action",
    component: ({ data }) => (
      <div className="d-flex gap-3">
        <Link href={`users/${data?.uuid}`}>
          <button type="button" className="btn btn-info">
            View Details
          </button>
        </Link>
        {data?.isEditable && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDelete(data?.uuid)}
          >
            Delete
          </button>
        )}
      </div>
    ),
  },
];

const page = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [searchDebounce] = useDebounce(search, 300);
  const { data: users } = useGetUsers({
    search: searchDebounce,
    pageIndex,
  });

  const deleteUser = async (uuid) => {
    await DELETE(`/users/${uuid}`);
  };

  const handleDelete = async (uuid) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      try {
        await deleteUser(uuid);
        router.push("/");
      } catch (error) {}
    }
  };

  return (
    <ProtectedComponent>
      <div className="container mt-5">
        <div className="d-flex flex-column justify-content-center h-100">
          <h4>USER PAGE</h4>
          <Table
            columns={columns(handleDelete)}
            datas={users?.data}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            setSearch={setSearch}
            totalData={users?.total}
            numberOfPages={users?.numberOfPages}
          />
        </div>
      </div>
    </ProtectedComponent>
  );
};

export default page;
