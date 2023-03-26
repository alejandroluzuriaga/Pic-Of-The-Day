import { useState, useEffect } from 'react'
import Figure from './components/Figure';
import './App.css'
import axios from 'axios';
import TextoExpansible from './components/TextoExpansible'
import Loading from './components/Loading';

function App() {
  const todayEurope = new Date(Date.now())
  todayEurope.setHours(todayEurope.getHours()-8)
  const today = todayEurope.toISOString().slice(0, 10); //La fecha de hoy es realmente la hora actual menos 8 horas para no tener problemas con la API entre las 00:00 y las 08:00.
  const [actualDate, setDate] = useState(today)
  const [data, setData] = useState(null)
  const [roverData, setRoverData] = useState(null)
  const [actualComponent, setActualComponent] = useState("nasa")

  const NASA_URL = "https://api.nasa.gov/";
  const NASA_API_KEY = "3tct8donAIi6LgIwIQNht08wQJhCYMcZcvjSugZh";

  const handleNewDate = (e) => {
    const enteredDate = new Date(e.target.value);
    const todayDate = new Date(today);
    if (!(enteredDate > todayDate)) {
      setDate(e.target.value.toLocaleString());
    }
  };

  const handleNewSelectOption = (e) => {
    if(e.target.value == "mars-rover-photo"){
      setActualComponent("rover");

    }else{
      setActualComponent("nasa");
    } 
    }

  useEffect(()=>{
    if (actualComponent === "nasa"){
        const APICallAPOD = () =>{
          axios.get(`${NASA_URL}planetary/apod?date=${actualDate}&api_key=${NASA_API_KEY}`)
          .then(res =>{
            setData(res.data)
            setActualComponent('nasa')
          }).catch(err =>{
            throw new Error('Error')
          })
        }
        APICallAPOD() 
    } else if(actualComponent === "rover"){
        const APICallRovers = () =>{
          axios.get(`${NASA_URL}mars-photos/api/v1/rovers/curiosity/photos?earth_date=${actualDate}&api_key=${NASA_API_KEY}`)
          .then(res =>{
            setRoverData(res.data.photos[0])
          }).catch(err =>{
            console.log(err)
          })
        }
        APICallRovers()
    }
  }, [actualDate, actualComponent])

  useEffect(()=>{
    if (data || roverData){
      document.body.style.height = "100%";
    }else{
      document.body.style.height = "100vh";
    }
  }, [data])

  return (
    <div className="App">
        <div className="image">
            <img 
              className='logo_nasa' 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/800px-NASA_logo.svg.png" 
              alt="Image of the day">
            </img>
        </div>
        {data && actualComponent === 'nasa' ? (
          <Figure 
            actualDate={actualDate} 
            data={data} 
            handleNewDate={handleNewDate}
            handleNewSelectOption={handleNewSelectOption}
          />
        ): 
        actualComponent == 'rover' ?(
          <Figure 
            actualDate={actualDate}
            roverData={roverData} 
            handleNewDate={handleNewDate}
            handleNewSelectOption={handleNewSelectOption}
          />
        ) : (
          <Loading/>
        )}
      </div>
  )
}

export default App
