"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <h2 style={styles.text}>Page Not Found</h2>
      <p style={styles.sub}>
        Oops! The page you're looking for doesn't exist.
      </p>

      <Link href="/" style={styles.button}>
        Go Home
      </Link>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #000000, #1f1c2c)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  code: {
    fontSize: "100px",
    margin: 0,
  },
  text: {
    fontSize: "30px",
  },
  sub: {
    opacity: 0.7,
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "#667eea",
    borderRadius: "10px",
    textDecoration: "none",
    color: "white",
  },
};