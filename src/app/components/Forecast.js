"use client";

export default function Forecast({ daily }) {
  return (
    <div className="forecast">
      {daily.map((day, i) => (
        <div key={i} className="forecast-card">
          <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
          <h3>{day.main.temp}°C</h3>
          <p>{day.weather[0].main}</p>
        </div>
      ))}
    </div>
  );
}