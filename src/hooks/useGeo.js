import { useEffect, useState } from "react";

export const useGeoWeather = () => {
  const [pos, setPos] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  // No need to use the following because weather data contains location info
  // const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState(null);

  //   Getting geolocation coordinates
  useEffect(() => {
    // Only set the two state when the component is not dismounted
    let isCanceled = false;
    if (!navigator.geolocation) {
      setError("The browser does not support geoloaction API");
      return;
    }
    if (!isCanceled) {
      navigator.geolocation.getCurrentPosition(setPos, (err) =>
        setError(err.message)
      );
    }
    return () => {
      isCanceled = true;
    };
  }, []);

  //   Getting the weather data and location data
  useEffect(() => {
    let isCanceled = false;
    if (pos) {
      const { latitude, longitude } = pos.coords;
      const API_KEY = "d0a10211ea3d36b0a6423a104782130e";
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
      const geocodingUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
      const getData = async (url, setState) => {
        const res = await fetch(url);
        const data = await res.json();
        if (!isCanceled) setState(data);
      };
      try {
        getData(weatherUrl, setWeatherData);
        // getData(geocodingUrl, setLocationData);        
      } catch (error) {
        setError(error.message);
      }
    }

    return () => {
      isCanceled = true;
    };
  }, [pos]);

  return [weatherData, error];
};
