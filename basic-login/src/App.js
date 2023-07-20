import React from "react";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";

// let userCred = localStorage.getItem(password)

function App() {
  return (
    localStorage.getItem('isLoggedIn') ? <Dashboard /> : <Login />
  );
}

export default App;
