import React, { useState } from 'react'
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';




function Inputs({setQuery, units, setUnits}) {
  const [selectedCity, setSelectedCity] = useState(-1);
  const [suggestCity , setSuggestCity] = useState([]);

  const [inputCity ,setInputCity] = useState("");

  const handleSearchClick = () => {
    if (inputCity !== "") {
      setQuery({ q: inputCity });
    console.log("handlesearchclick")}
    setInputCity("");
  };

   const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching users location.");
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("test")
        toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        console.log("handleLocationClick");

        setQuery({
          lat,
          lon,
        });
      });
    }
  }; 


const getCitiesSuggest = async (value) => {

    if (value.length >= 3) {
      try {
        const url = `https://corsproxy.io/?https://api-adresse.data.gouv.fr/search/?q=${value}&limit=4&autocomplete=1&type=municipality`;
        const response = await fetch(url);
        const data = await response.json();        
        const cityData = data.features.map((feature) => ({
          name: feature.properties.name,
          citycode: feature.properties.citycode,
          lat : feature.geometry.coordinates[1],
          lon : feature.geometry.coordinates[0]
        }));
        console.log(cityData);
        setSuggestCity(cityData);
      } catch (err) {
        console.error(err);
      } return suggestCity
    }
  };


const onChange = (e) =>{
 var value = e.currentTarget.value ;
 setInputCity (value);
 getCitiesSuggest(value);
};



const handleSelectCity = async (cityName ,cityCode ,lon, lat) => {
  setQuery({ lat : lat , lon : lon});
  setInputCity("");
}
/*
const handleKeyUp = () => {
if ( selectedCity> -1) {
  setSelectedCity(selectedCity - 1) ;
}
}
const handleKeyDown = () => {
if ( selectedCity<4){
  setSelectedCity(selectedCity + 1) ;
}
};*/

  return (
    <div className='flex flex-row justify-center my-6 '>
      <ToastContainer />
     <div className="flex flex-row w-3/4 justify-center space-x-4">
      <div className='flex-col w-full '>
        <input
          value={inputCity}
          onChange={onChange}
          type="text"
          name='searchBar'
          placeholder="Search for a city...."
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
        />
            {inputCity.length > 2 && (
        <ul className=''>
          {suggestCity.map((city) => (
            <li className=' shadow-xl hover:bg-slate-100 bg-white text-lg text-gray-400 ' key={suggestCity[selectedCity]} onClick={(e) => handleSelectCity(city.name ,city.citycode ,city.lon , city.lat)}>
              {city.name} <span className=' self-end font-light '>{" " + city.citycode}</span>
            </li>
          ))}
        </ul>
      )}
        </div>
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>
</div>
  )
}

export default Inputs ;