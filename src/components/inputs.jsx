import React, { useState } from 'react'
import { UilSearch, UilLocationPoint ,UilMapPin  } from '@iconscout/react-unicons'
import { Toastontainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Inputs({setQuery, units, setUnits}) {
  const [city ,setCity] = useState("");
  const handleSearchClick = () => {
    if (city !== "") {
      setQuery({ q: city });
    console.log("handlesearchclick")}
  };

   const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching users location.");
      navigator.geolocation.getCurrentPosition((position) => {
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

  return (
    <div className='flex flex-row justify-center my-6 '>
     <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search for a city...."
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
        />
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

export default Inputs