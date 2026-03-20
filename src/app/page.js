"use client";

import { useEffect, useState } from "react";
import Search from "./components/Search";
import Weather from "./components/Weather";

export default function Home() {
  const [city, setCity] = useState("Chennai");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
        );

        const data = await res.json();
        setCity(data.name);
      });
    }
  }, []);

  return (
    <div className="main-container">
      <Search setCity={setCity} />
      <Weather city={city} />
    </div>
  );
}