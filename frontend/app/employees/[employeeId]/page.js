"use client";
import { useRef, useCallback, useState, useEffect } from "react";
import { useRegister } from "../_hooks/index";
import { useRouter } from "next/navigation";

export default function Register() {
  //QUERY
  const router = useRouter();
  //LOCAL STATE
  const nameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      const response = await useRegister({
        name: nameRef?.current?.value,
        username: usernameRef?.current?.value,
        password: passwordRef?.current?.value,
        confirmPassword: confirmPasswordRef?.current?.value,
      });

      if (response?.error) return alert(response?.error);
      if (response?.message) {
        alert(response?.message);
        router.push("/");
      }
    } catch (error) {}
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center h-100">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">Register</h5>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      required
                      ref={nameRef}
                      className="form-control"
                      id="floatingInput"
                      placeholder="nama"
                    />
                    <label htmlFor="floatingInput">Nama</label>
                  </div>
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
                  <div className="form-floating mb-3">
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
                  <div className="form-floating">
                    <input
                      type="password"
                      required
                      ref={confirmPasswordRef}
                      className="form-control"
                      id="floatingPassword"
                      placeholder="confirm password"
                    />
                    <label htmlFor="floatingPassword">Confirm Password</label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-3"
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
