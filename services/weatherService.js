import Location from '../models/Location.js';
import Forecast from '../models/Forecast.js';


const API_WEATHER_URL = 'http://api.weatherapi.com/v1/forecast.json';
const KEY_API = '8d751f8c7c644ffbae2152909211406';

const getForecastLocation = async (query) => {
    let hour = getHour();
    let response = await fetch(`${API_WEATHER_URL}?key=${KEY_API}&q=${query}&days=3&hour=${hour}&lang=es`);
    if(response.ok){
        response = response.json();
    }else{
        return Promise.reject(response);
    }
    return response;
}

const getHour = () => {
    return new Date().getHours();
}

const createLocation = (data) => {
    const { name, region, country, lat, lon } = data.location;
    let forecasts = findForecasts(data.forecast.forecastday);
    let location = new Location(name, region, country, lat, lon,forecasts);
    return location;
}

const findForecasts = (forecast) => {
    let response = forecast.map(day=>{
        const hour = day.hour[0];
        const condition = hour.condition;
        return new Forecast(hour.time,hour.temp_c,hour.wind_kph,hour.pressure_in,hour.humidity,condition.text,condition.icon)
    })
    return response;
}

export { getForecastLocation, createLocation }