import { GET, SERVER_POST, DELETE } from "../_services/api";
import useSWR from "swr";

export async function useLogin(payload) {
  const URL = `/login`;
  const data = await SERVER_POST(URL, payload);

  return data;
}

export async function useRegister(payload) {
  const URL = `/register`;
  const data = await SERVER_POST(URL, payload);

  return data;
}

export function useGetUsers(props) {
  const { search, pageIndex } = props;
  const URL = search
    ? `/users?search=${search}&pageIndex=${pageIndex}&limit=10`
    : `/users?pageIndex=${pageIndex}&limit=10`;

  const { data, isLoading, error } = useSWR(URL, GET);

  return {
    data: data?.data,
    isLoading,
    isError: error,
  };
}

export function useGetEmployees(props) {
  const { search, pageIndex } = props;
  const URL = search
    ? `/employees?search=${search}&pageIndex=${pageIndex}&limit=10`
    : `/employees?pageIndex=${pageIndex}&limit=10`;

  const { data, isLoading, error } = useSWR(URL, GET, {});

  return {
    data: data?.data,
    isLoading,
    isError: error,
  };
}

export function useDeleteUser(props) {
  const { id } = props;
  const URL = `/users/${id}`;

  const { data, mutate } = useSWR(URL, DELETE);

  return {
    data,
    mutate,
  };
}
