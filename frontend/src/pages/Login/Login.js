import React, { useState } from 'react';

import api from "../../services/api";

import "./styles.css";

function Login({ history }) {
  const [email, setEmail] = useState("");

  async function handleSubmit(event){
    event.preventDefault();

    const response = await api.post("sessions", { email });

    const { _id } = response.data;

    localStorage.setItem("user", _id);

    history.push("/dashboard")
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className="form-control">
        <label>Email</label>
        <input type="email" placeholder="Email"/>
      </div>
      
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;