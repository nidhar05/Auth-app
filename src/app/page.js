"use client";

import { useEffect, useState } from "react";
import Search from "./components/Search";
import Weather from "./components/Weather";

export default function Home() {
  const [city, setCity] = useState("Chennai");

  useEffect(() => {
    const saved = localStorage.getItem("city");
    if (saved) setCity(saved);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
          );

          const data = await res.json();
          if (data.name) setCity(data.name);
        } catch (e) {}
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("city", city);
  }, [city]);

  return (
    <div className="main-container">
      <Search setCity={setCity} />
      <Weather city={city} />
    </div>
  );
}