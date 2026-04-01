"use client";

import { useState } from "react";
import { useAuth } from "./AuthContext";

export default function Auth() {
  const {
    user,
    setUser,
    password,
    setPassword,
    isLoggedIn,
    login,
    logout,
  } = useAuth();

  const [inputUser, setInputUser] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    login(inputUser, inputPassword);
  };

  return (
    <div style={box}>

      {!isLoggedIn ? (
        <>
          <input
            style={{borderRadius: "5px", padding: "10px", margin: "10px", width: "200px", fontSize: "16px"}}
            type="text"
            placeholder="Enter username"
            value={inputUser}
            onChange={(e) => setInputUser(e.target.value)}
          />
          <br></br>
          <input
            style={{borderRadius: "5px", padding: "10px", margin: "10px", width: "200px", fontSize: "16px"}}
            type="password"
            placeholder="Enter password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <br></br>
          <button style={{borderRadius: "5px", padding: "10px", margin: "10px", width: "100px", fontSize: "16px", backgroundColor: "#0dd667", cursor: "pointer"}} onClick={handleLogin}>
            Login
          </button>
        </>
      ) : (
        <>
          <p>Welcome, {user}</p>
          <p> Your Password: {password} </p>
          <button style={{borderRadius: "5px", padding: "10px", margin: "10px", width: "200px", fontSize: "16px", backgroundColor: "#ff4d4d", cursor: "pointer"}} onClick={logout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

const box = {
  paddingTop: "100px",
  paddingBottom: "100px",
  paddingLeft: "5px",
  paddingRight: "5px",
  border: "5px solid #334155",
  borderRadius: "30px",
  background: "#1e293b",
  color: "white",
  margin: "150px auto",
  maxWidth: "400px",
};