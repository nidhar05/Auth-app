"use client";

import Auth from "@/app/components/Auth/Auth";
import { AuthProvider } from "@/app/components/Auth/AuthContext";

export default function Page() {
  return (
    <AuthProvider>
      <div style={container}>
        <h1>Authentication</h1>
        <Auth />
      </div>
    </AuthProvider>
  );
}

const container = {
  padding: "20px",
  minHeight: "100vh",
  background: "#16213c",
  textAlign: "center",
  color: "white",
};