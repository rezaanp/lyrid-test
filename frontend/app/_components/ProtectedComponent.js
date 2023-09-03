"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";

const ProtectedComponent = ({ children }) => {
  const router = useRouter();
  const { token } = useSelector((state) => state?.authReducer);

  if (!token) {
    router.push("/");
  }

  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};

export default ProtectedComponent;
