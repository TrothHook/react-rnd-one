"use client";
import React from "react";
import { useRouter } from "next/navigation";


function Dashboard() {
  const router = useRouter();

  const loggedIn = localStorage.getItem("isLoggedIn");
  loggedIn && router.push("/dashboard");

  history.pushState(null, null, location.href);
  window.onpopstate = function (event) {
    history.go(1);
  };
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("authToken");
    localStorage.removeItem("ally-supports-cache");
    router.push("/auth/login");
  };
  return (
    <>
      <div>Hello, from Dashboard</div>;
      <button
        className="btn btn-light btn-lg mt-5 px-4 py-2"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </>
  );
}

export default Dashboard;
