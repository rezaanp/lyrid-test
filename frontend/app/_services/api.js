"use client";
import axios from "axios";
import { useSelector } from "react-redux";

const BASE_URL = "http://localhost:5000";

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
API.interceptors.response.use(
  (response) => {
    if (response?.status === 401) return (window.location.href = "/");
    return response;
  },
  (error) => {
    alert(error?.message);
  }
);

//FETCH API FOR CLIENT RENDERING
async function GET(endpoint) {
  try {
    const response = await API.get(endpoint);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function CLIENT_POST(endpoint, payload) {
  try {
    const response = await API.delete(endpoint, payload);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function PATCH(endpoint, payload) {
  try {
    const response = await API.delete(endpoint, payload);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function DELETE(endpoint) {
  try {
    const response = await API.delete(endpoint);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

//FETCH API FOR SERVER RENDERING
async function SERVER_POST(endpoint, payload) {
  try {
    const res = await fetch(BASE_URL + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export { GET, SERVER_POST, PATCH, DELETE, CLIENT_POST };
