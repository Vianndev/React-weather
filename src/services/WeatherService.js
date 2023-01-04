import { DateTime } from "luxon";
const API_KEY = '591a43944e3934b181bbfa196bd63c1f';
const BASE_URL = "https://api.openweathermap.org/data/2.5"

//https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);

    url.search = new URLSearchParams ({...searchParams,appid:API_KEY})
    console.log(url)
    return fetch(url)
    .then((res) => res.json())
    .then((data) => data )
    .catch((err) => console.error(err));
}
const formatCurrentWeather =  (data) => {
    const {
        coord : {lat ,lon},
        main: {temp, feels_like, temp_min, temp_max, humidity },
        sys:{country, sunrise, sunset},
        weather, dt , name,
        wind: {speed}
 
    } = data
    const {main: details, icon} = weather[0];
    console.log({lat, lon, temp, feels_like , temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed });
    return {lat, lon, temp, feels_like , temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed };

}
const formatForecastWeather = (data) => {
    let {timezone, daily, hourly} = data;
    daily = daily.slice(1, 6).map( d => { 
        return { 
            title : formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon : d.weather[0].icon
        }})
        hourly = hourly.slice(1, 6).map( d => { 
            return { 
                title : formatToLocalTime(d.dt, timezone, 'hh:mm a'),
                temp: d.temp,
                icon : d.weather[0].icon
            }})
            return {timezone, daily , hourly};
}

const iconUrlFromCode = (code) =>`http://openweathermap.org/img/wn/${code}@2x.png`

const formatToLocalTime = (
    secs, 
    zone, 
    format = "cccc, dd LLL yyyy' | Local time :'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

  const getFormattedWeatherData = async (searchParams) => {

       const formattedCurrentWeather = await getWeatherData ('weather',searchParams,{lang:'fr'},{units: "metric"})
       .then(formatCurrentWeather);

       const {lat, lon} = formattedCurrentWeather;
       const formattedForecastWeather = await getWeatherData ('onecall', {lat, lon, exclude:'current,minutely,alerts',lang:'fr',units: "metric"})
        .then(formatForecastWeather);
  return {...formattedCurrentWeather, ...formattedForecastWeather};
}
export default getFormattedWeatherData;

export {formatToLocalTime, iconUrlFromCode};