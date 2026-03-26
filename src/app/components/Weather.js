"use client";

import { useEffect, useState } from "react";
import Forecast from "./Forecast";
import Loader from "./Loader";
import styles from "./Weather.module.css";

export default function Weather({ city }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setError("");
        setData(null);

        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!res.ok) throw new Error("City not found");

        const result = await res.json();

        const current = result.list[0];

        const daily = result.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );

        setData({
          current,
          daily,
          name: result.city.name,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeather();
  }, [city]);

  if (error) return <p className={styles.error}>{error}</p>;
  if (!data) return <Loader />;

  const condition = data.current.weather[0].main;

  const getClass = () => {
    switch (condition) {
      case "Clear":
        return "sunny";
      case "Clouds":
        return "cloudy";
      case "Rain":
        return "rainy";
      case "Snow":
        return "snowy";
      case "Thunderstorm":
        return "storm";
      default:
        return "sunny";
    }
  };


  const getBackgroundImage = () => {
    switch (condition) {
      case "Clear":
        return "/images/clear.jpg";
      case "Clouds":
        return "/images/clouds.jpg";
      case "Rain":
        return "/images/rain.jpg";
      case "Snow":
        return "/images/snow.jpg";
      case "Thunderstorm":
        return "/images/storm.jpg";
      default:
        return "/images/default.jpg";
    }
  };

  return (
    <div
      className={`${styles.card} ${styles[getClass()]}`}
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
      }}
    >
      <div className={styles.overlay}></div>

      <h2>{data.name}</h2>
      <h1>{Math.round(data.current.main.temp)}°C</h1>
      <p>{condition}</p>

      <img
        src={`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}
        alt="weather icon"
        className="weather-icon"
      />

      <div className={styles.details}>
        <p>💧 Humidity: {data.current.main.humidity}%</p>
        <p>🌬️ Wind: {data.current.wind.speed} m/s</p>
        <p>🌡️ Feels Like: {Math.round(data.current.main.feels_like)}°C</p>
        <p>🌡️ Pressure: {data.current.main.pressure} hPa</p>
      </div>

      <Forecast daily={data.daily} />
    </div>
  );
}