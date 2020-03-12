import React from "react";
import './MainWeather.css';

const MainWeather = (props) => {
    return(
        <div className="weather-container text-center main-color">
            <div className='p-4'>
                <h2 className='temperature'>{ props.weather.temperature }&#176;C</h2>
                <p className='city'>{ props.weather.location.city + ', ' + props.weather.location.country}</p>
                <p className='info'>{ props.weather.info }</p>
            </div>
        </div>
    );
};

export default MainWeather;