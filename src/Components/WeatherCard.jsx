import axios from 'axios';
import { useEffect, useState } from 'react';
import '../App.css'


const WeatherCard = () => {

    const [weather, setWeather] = useState({})
    const [temp, setTemp] = useState(0)
    const [unitTemp, setUnitTemp] = useState("°C")


    const changeUnitTemp =() => {
        if (unitTemp === "°C") {
            setUnitTemp("°F"),
            setTemp(Math.round((temp * 9/5) + 32))
            
        } else {
            setUnitTemp("°C")
            setTemp(Math.round((temp - 32) * 5/9))
        }
    };
        
    useEffect(() => {
        const success = position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=16f91e6b3db4da15239e3cff5cecbafb&units=metric`)
                .then(res => {setWeather(res.data)
                              setTemp(Math.round(res.data.main.temp))}
                )}
        navigator.geolocation.getCurrentPosition(success)

    },[]);

    //console.log(weather)
    //console.log(temp)
    return (
        <div>
            <div className="card">
                <h1 className="title">Weather App</h1>
                <h2 className="country">{weather.sys?.country}</h2>
                <h2 className="city">{weather.name}</h2>
                <h2 className="temp">{temp} {unitTemp}</h2>
            <div className="flex">
                <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
            <div className="description">{weather.weather?.[0].description}</div>
            <br />
            </div>
            <div className="humidity">Humidity: {weather.main?.humidity}%</div>
            <div className="wind">Wind speed: {weather.wind?.speed} km/h</div>
            <button onClick={changeUnitTemp}>°C / °F</button>
            </div>
        </div>
    );
};

export default WeatherCard;