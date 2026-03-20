"use client";

import { useState } from "react";
import Search from "./components/Search";
import Weather from "./components/Weather";

export default function Home() {
  const [city, setCity] = useState("Chennai");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🌦️ Weather App</h1>

      <Search setCity={setCity} />
      <Weather city={city} />
    </div>
  );
}