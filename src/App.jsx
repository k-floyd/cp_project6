import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import { BrowserRouter, Route, Routes, Link, Outlet } from 'react-router-dom'

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [searchedLocations, setSearchedLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState('imperial'); // Default to Fahrenheit

  useEffect(() => {
    const fetchData = async () => {
      if (location) {
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${temperatureUnit}&appid=70513bb7025a9803d9b1fee3fb148185`);
          //const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${temperatureUnit}&appid=98812002a75aa3103fc9e5bc39015b89`);
          setData(response.data);
          setSearchedLocations((prevLocations) => [...prevLocations, location]);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [location, temperatureUnit]);

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      setLocation(event.target.value);
    }
  }

  const handleLocationFilterChange = (event) => {
    setSelectedLocation(event.target.value);
  }

  const handleTemperatureUnitChange = (event) => {
    setTemperatureUnit(event.target.value);
  }

  const filteredData = data.name === selectedLocation ? data : {};

  const Home = () => <h1>Home</h1>;
  const Dashboard = () => <h1>Dashboard</h1>;
  const Settings = () => <h1>Settings</h1>;

  return (
    <>
      <div className="app">

      {/* <div>
        <div className="navigation">

          <h1>Menu: </h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About </Link>
            <Link to="/contact">Contact</Link>
          </nav>
          </div>
          <Outlet />
      </div> */}

      <BrowserRouter>
          <Routes>
            <Route path = "/" element = {<Home />} />
            <Route path = "/dashboard" element = {<Dashboard />} />
            <Route path = "/settings" element = {<Settings />} />
          </Routes>
        </BrowserRouter>

        

        <h1 className="heading">So, How's the Weather?</h1>

        <div className="search">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter Location"
            type="text"
          />
        </div>

        <div className="container">

          <div className="filters">
            {/* Location filters */}
            <div className="location-filters">
              <label htmlFor="locationFilter">History:</label>
              <select id="locationFilter" value={selectedLocation} onChange={handleLocationFilterChange}>
                <option value="">All Locations</option>
                {searchedLocations.map((loc, index) => (
                  <option key={index} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Temperature unit filter */}
            <div className="temperature-filters">
              <label htmlFor="temperatureFilter">Select Unit:</label>
              <select id="temperatureFilter" value={temperatureUnit} onChange={handleTemperatureUnitChange}>
                <option value="imperial">Fahrenheit</option>
                <option value="metric">Celsius</option>
              </select>
            </div>
          </div>

          {/* Display filtered data */}
          <div className="top">
            <div className="location">
              <p>{filteredData.name}</p>
            </div>
            <div className="temp">
              {filteredData.main ? (
                <h1>
                  {temperatureUnit === 'imperial' ? (
                    `${filteredData.main.temp.toFixed()}°F`
                  ) : (
                    `${filteredData.main.temp.toFixed()}°C`
                  )}
                </h1>
              ) : null}
            </div>
            <div className="desc">
              {filteredData.main ? (
                <p>
                  Low: {temperatureUnit === 'imperial' ? (
                    `${filteredData.main.temp_min.toFixed()}°F`
                  ) : (
                    `${filteredData.main.temp_min.toFixed()}°C`
                  )}
                </p>
              ) : null}
              {filteredData.main ? (
                <p>
                  High: {temperatureUnit === 'imperial' ? (
                    `${filteredData.main.temp_max.toFixed()}°F`
                  ) : (
                    `${filteredData.main.temp_max.toFixed()}°C`
                  )}
                </p> ) : null}
            </div>
          </div>
          
          { /*dont populate anything until the user has enter a city name*/ }
          {data.name != undefined &&
              
              //  <div className="middle">
              //     <div className="sunrise">
              //       <img src="./images/sun.png" alt="sun"></img>
              //       {data.main ? <p>Sunrise: {data.sys.sunrise.toFixed()}°F</p> : null}
              //     </div>
              //   <div className="sunset">
              //     <img src="./images/moon.png" alt="moon"></img>
              //     {data.main ? <p>Sunset: {data.sys.sunset.toFixed()}°F</p> : null}
              //   </div>
              //  </div>


              <div className="bottom">
              <div className="feels">
                {/* check if the data.main is available and then proceed to feels like */}
                {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p> : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {/* check if the data.main is available and then proceed to humidity */}
                {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {/* check if the data.wind is available and then proceed to humidity */}
                {data.wind ? <p className="bold">{data.wind.speed.toFixed()}MPH</p> : null}
                <p>Wind Speed</p>
              </div>
              </div>

          }

        </div>
      </div>
    </>
  )
}

export default App
