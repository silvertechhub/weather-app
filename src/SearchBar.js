import React, {useState} from 'react';
import axios from 'axios';
import classNames from 'classnames';

export default function SearchBar() {
    const [location, setLocation] = useState("");
    const [Temperature, setTemp] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [weather, setWeather] = useState("");
    const [display, setDisplay] = useState(false);
    const [err, setErr] = useState("");
    const [rainBg, setRainBg] = useState(false);
    const [snowBg, setSnowBg] = useState(false);
    const [cloudBg, setCloudBg] = useState(false);

    const options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
        params: {
          q: location ,
          units: 'metric'
         
        },
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key': '11c00ed2abmsh22fb555d860c18fp1a4a98jsn7493874407dd'
        }
      };

      // switch (weather) {
        //   case "rain":
        //     setBg("rain")
        //     break;
        //     // case (Temperature <= 30 && Temperature >= 20) && weather === "clear":
        //     // bg = "sunnyday"
        //     // break;
        //     // case (Temperature >= 20) && weather === "cloud":
        //     // bg = "clouds"
        //     // break;
        //     // case Temperature < 20 && weather === "cloud":
        //     // bg = "cloudy"
        //     // break;
        //     // case Temperature < 20 && weather === "clear":
        //     //   bg = "sunny-clouds"
        //     //   break;
        //     // case  weather === "rain":
        //     // bg = "rain"
        //     // break;
        //     // case  weather === "snow":
        //     // bg = "snow"
        //     // break;
        //     // case Temperature > 30 && weather === "clear":
        //     // bg = "sunnyday-hills"
        //     // break;
        //   default:setBg("container")
        //     break;
        // }


         //set today's date
      const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
     
      let d = new Date();
      let year = d.getFullYear();
      let month = months[d.getMonth()];
      let day = d.getDate();
      let today = days[d.getDay()];
    

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.request(options)
        .then((res) => {
            setCity(res.data.name);
            setTemp(res.data.main.temp);
            setWeather(res.data.weather[0].main);
            setCountry(res.data.sys.country);
            setDisplay(true);
            console.log(res.data);
           
            // // switch statment
            // switch (res) {
            //   case res.data.weather[0].main === "rain":
            //     setRainBg(true)
            //     break;
            //     case res.data.weather[0].main === "snow":
            //     setSnowBg(true)
            //     break;
            //     case res.data.weather[0].main === "clouds":
            //     setCloudBg(true)
            //     break;
            
            //   default:
            //     break;
            // }
           
            setLocation("");
        }).catch((err) => {
            setDisplay(true);
            setErr("Oops! Could not find your city");
          console.log(err)
            setLocation("");
          
        })
    }
    
    
     
  return <div className={classNames('container', {'rain' : rainBg, 'snow': snowBg, 'clouds': cloudBg })}>
        
      <div className='date'>
          <span>{today},  {day}-{month }-{year}  </span>
      </div>
      <form onSubmit={handleSubmit}>
      <input type='text' required value={location} className="search" onChange={(e) => setLocation(e.target.value)}
       placeholder="search city" />
      <input type="submit" value="Search"  className='submit-btn'/>
      </form>

      {(display === true) ? (
        <div className='display '>
          {(!err) ? (<div>
          <div>
            <span className='temp'>{Math.round(Temperature)}&#8451;,</span> 
            <span className='weather'>{weather}</span>
          </div>
          <span className='location'>{city}, {country} </span>
          </div>) :(
            <span className='error'>{err}</span>
          ) }
          
          {/* <div>
          <div>
            <span className='temp'>{Math.round(Temperature)}&#8451;,</span> 
            <span className='weather'>{weather}</span>
          </div>
          <span className='location'>{city}, {country} </span>
          </div> */}

        </div>
    ):
       (
          <span className='onload'>Search for your city's weather</span>
      ) }
      
  </div>;
}
