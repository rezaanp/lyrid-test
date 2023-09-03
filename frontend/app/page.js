"use client";
import { useRef, useCallback, useEffect } from "react";
import { useLogin } from "./_hooks/index";
import { login, logout } from "./_bootstraps/actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  //QUERY
  const router = useRouter();
  const dispatch = useDispatch();
  //LOCAL STATE
  const usernameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    dispatch(logout());
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      const response = await useLogin({
        username: usernameRef?.current?.value,
        password: passwordRef?.current?.value,
      });

      if (response?.error) return alert(response?.error);
      dispatch(login(response?.token));
      localStorage.setItem("authToken", response?.token);

      router.push("/users");
    } catch (error) {}
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center h-100">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">Login</h5>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      required
                      ref={usernameRef}
                      className="form-control"
                      id="floatingInput"
                      placeholder="username"
                    />
                    <label htmlFor="floatingInput">Username</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="password"
                      required
                      ref={passwordRef}
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-3"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
            <p>
              Dont have account <Link href="/register">Register Now</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
