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

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search city..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}