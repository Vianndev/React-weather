import React from "react";

function TopButtons ({setQuery}) {
 
    const cities = [
        {
        id:1,
        title:'Lyon'
    },
    {
        id:2 ,
        title:'Paris'
    },
    {
        id:3,
        title:'Marseille'
    },{
        id:4,
        title:'Nice'
    }
]
return <div className="flex items-center justify-around my-6">
    {cities.map((city) => (
    <button key={city.id} onClick={() => setQuery({q: city.title})} className="text-white text-lg font-medium">{city.title}</button>))}
    </div>
}

export default TopButtons ;