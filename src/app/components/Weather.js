"use client";

import { useEffect, useState } from "react";
import { WiThermometer, WiHumidity, WiStrongWind } from "react-icons/wi";

export default function Weather({ city }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setError("");

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
        );

        if (!res.ok) throw new Error("City not found");

        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);
        setData(null);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="card-container">
      {error && <p className="error">{error}</p>}

      {data && (
        <div className="weather-card">
          <h2>{data.name}</h2>

          <h1 className="temp">{data.main.temp}°C</h1>
          <p className="condition">{data.weather[0].main}</p>

          <div className="details">
            <div>
              <WiThermometer size={40} />
              <p>{data.main.temp}°C</p>
            </div>

            <div>
              <WiHumidity size={40} />
              <p>{data.main.humidity}%</p>
            </div>

            <div>
              <WiStrongWind size={40} />
              <p>{data.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}