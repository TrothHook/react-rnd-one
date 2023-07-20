import React, { useState } from "react";
import FormInput from "../components/Input";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitData = (e) => {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("isLoggedIn", true);
  };

  return (
    <div className="container">
      <h1>Hello</h1>
      <form className="form" onSubmit={submitData}>
        <FormInput type="text" placeholder="Username" submit={setUsername} />
        <FormInput
          type="password"
          placeholder="Password"
          submit={setPassword}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
