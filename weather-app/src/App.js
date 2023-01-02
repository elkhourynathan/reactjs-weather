import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [location, setLocation] = useState("Ottawa");
  const [currWeather, setWeather] = useState({ cod: "404" });

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=5156d64212cd75033a92a22277eb5971`;

  async function fetchWeather() {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => setWeather(data));
  }

  const userLocation = (event) => {
    if (event.key === "Enter") {
      fetchWeather();
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="container">
      <div className="content">
        <label>
          Enter location:
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={userLocation}
            placeholder="Enter Location"
            type="text"
          />
        </label>
        <div className="data">
          {currWeather.cod == "200" ? (
            <>
              <div className="top">
                <div className="location">
                  <p>
                    {currWeather.name}, {currWeather.sys.country}
                  </p>
                </div>
                <div className="temp">
                  <p>{Math.round(currWeather.main.temp)} °F</p>
                  <img
                    src={`http://openweathermap.org/img/wn/${currWeather.weather[0].icon}@2x.png`}
                  ></img>
                </div>
                <div className="highlow">
                  <p>High: {Math.round(currWeather.main.temp_max)} °F</p>
                  <p>Low: {Math.round(currWeather.main.temp_min)} °F</p>
                </div>

                <p>Conditions: {currWeather.weather[0].main}</p>
                <p>Feels Like: {Math.round(currWeather.main.feels_like)} °F</p>
              </div>
            </>
          ) : (
            <p>Invalid City</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
