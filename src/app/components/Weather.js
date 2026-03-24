"use client";

import { useEffect, useState } from "react";
import { WiThermometer, WiHumidity, WiStrongWind } from "react-icons/wi";
import styles from "./Weather.module.css";

export default function Weather({ city }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const getBackground = (condition) => {
    switch (condition) {
      case "Clear":        return "linear-gradient(to right, #808d8eff, #367e92ff)";
      case "Clouds":       return "linear-gradient(to right, #bdc3c7, #2c3e50)";
      case "Rain":         return "linear-gradient(to right, #4b79a1, #283e51)";
      case "Thunderstorm": return "linear-gradient(to right, #141e30, #243b55)";
      case "Snow":         return "linear-gradient(to right, #e6dada, #274046)";
      default:             return "linear-gradient(to right, #4facfe, #00f2fe)";
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setError("");
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
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

  const inlineCardStyle = data
    ? {
        background: getBackground(data.weather[0].main),
        borderRadius: "24px",
        padding: "36px",
        width: "320px",
        textAlign: "center",
        color: "white",
      }
    : {};

  const inlineTempStyle = {
    fontSize: "56px",
    fontWeight: "800",
    margin: "12px 0 4px",
    textShadow: "0 4px 12px rgba(0,0,0,0.25)",
  };

  return (
    <div className="main-container">
      {error && (
        <p className={styles.moduleError}>{error}</p>
      )}

      {data && (
        <div style={inlineCardStyle} className={styles.moduleCard}>
          <h2 className={styles.moduleCityName}>{data.name}</h2>

          <h1 style={inlineTempStyle}>{data.main.temp}°C</h1>

          <p className={styles.moduleCondition}>🌥️ {data.weather[0].main}</p>

          <div className={`details ${styles.moduleDetails}`}>
            <div className={styles.moduleDetailItem}>
              <WiThermometer size={40} />
              <p>{data.main.temp}°C</p>
            </div>
            <div className={styles.moduleDetailItem}>
              <WiHumidity size={40} />
              <p>{data.main.humidity}%</p>
            </div>
            <div className={styles.moduleDetailItem}>
              <WiStrongWind size={40} />
              <p>{data.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
