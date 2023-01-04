import './index.css'
import React, { useState, useEffect } from 'react';
import TopButtons from './components/TopButtons';
import Inputs from './components/inputs.jsx'
/* import { searchBox }  from './searchBox.js'; */
/* import { Forecast } from './Forecast';*/
import TimeAndLocation from './TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/WeatherService';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

/* 591a43944e3934b181bbfa196bd63c1f */
function App() {
  const [query, setQuery] = useState({q:"Lyon"});
  const [units, setUnits] = useState('metric');
  const lang = 'fr';
  const [weather, setWeather] = useState(null);

useEffect( () => {

    const fetchWeather = async () => {
      await getFormattedWeatherData({...query,units,lang}).then((data) => {setWeather(data);});
    }
    fetchWeather();
  },[query,lang,units]);
   
  const formatBackground = () => {
    if (!weather) return 'from-cyan-700 to-blue-700' 
    if (weather.temp <= 20) return 'from-cyan'
    return 'from-yellow-700 to-orange-700'
  }

  return (
    <div className={`w-full h-max py-4 px-5 bg-gradient-to-br from-cyan-700 to-blue-700 shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <header className=''>
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      </header>
      <main className='xl:w-3/5 xl:mx-auto'>

      {weather && (
        <div>
          <TimeAndLocation weather={weather}  />
          <TemperatureAndDetails weather={weather} />

          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
        </div>
      )}
      </main>
      <footer>

      </footer>
    </div>
  );
};


export default App;
