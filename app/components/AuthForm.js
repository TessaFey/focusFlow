"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

function AuthForm() {
  const router = useRouter();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let result;
      if (mode === "signup") {
        result = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        result = await signInWithEmailAndPassword(auth, email, password);
      }

      setUser(result.user);
      router.push("/home");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  if (user) {
    return (
      <div style={{ padding: "1rem" }}>
        <p>Logged in as: {user.email}</p>
        <button onClick={handleLogout}>Log out</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem", maxWidth: "320px" }}>
      <h2>{mode === "signup" ? "Sign Up" : "Log In"}</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Email <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Password <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>

        <button type="submit" style={{ marginRight: "0.5rem" }}>
          {mode === "signup" ? "Create Account" : "Log In"}
        </button>

        <button
          type="button"
          onClick={() =>
            setMode(mode === "signup" ? "login" : "signup")
          }
        >
          Switch to {mode === "signup" ? "Log In" : "Sign Up"}
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>
      )}
    </div>
  );
}

export default AuthForm;
