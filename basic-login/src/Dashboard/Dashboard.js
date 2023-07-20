import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.reload()
  };
  return (
    <div className="container">
      <h1>Hello, {username}</h1>
      <button className="btn btn-light btn-lg mt-5 px-4 py-2" onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Dashboard;
