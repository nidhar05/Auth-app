"use client";

import { useState } from "react";
import styles from "./Search.module.css";

export default function Search({ setCity }) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (input.trim()) {
      setCity(input);
      setInput("");
    }
  };

  const inlineWrapperStyle = {
    position: "absolute",
    top: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
  };

  const inlineAccentBar = {
    width: "40px",
    height: "3px",
    borderRadius: "99px",
    background: "linear-gradient(90deg, #667eea, #764ba2)",
    marginBottom: "4px",
  };

  return (
    <div style={inlineWrapperStyle}>
      <div style={inlineAccentBar} />

      <div className={styles.moduleSearchBox}>
        <input
          className={styles.moduleInput}
          type="text"
          placeholder="Search city..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className={styles.moduleButton} onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}
