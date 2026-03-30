"use client";

export default function Error({ error, reset }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Something went wrong 😢</h1>

      <p style={styles.message}>{error.message}</p>

      <button onClick={() => reset()} style={styles.button}>
        Try Again
      </button>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #000000, #434343)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: "32px",
  },
  message: {
    marginTop: "10px",
    opacity: 0.8,
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    borderRadius: "10px",
    background: "#ff6b6b",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};