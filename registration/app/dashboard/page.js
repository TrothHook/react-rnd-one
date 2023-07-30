"use client";
import React from "react";

function Dashboard() {
  history.pushState(null, null, location.href);
  window.onpopstate = function (event) {
    history.go(1);
  };
  return <div>Hello, from Dashboard</div>;
}

export default Dashboard;
