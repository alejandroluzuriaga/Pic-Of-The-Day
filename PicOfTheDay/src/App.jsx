import { useState, useEffect } from 'react'
import Figure from './components/Figure';
import './App.css'
import axios from 'axios';
import TextoExpansible from './components/TextoExpansible'
import Loading from './components/Loading';

function App() {
  const today = new Date(Date.now()).toISOString().slice(0, 10);
  const [actualDate, setDate] = useState(today)
  const [data, setData] = useState(null)
  const [roverData, setRoverData] = useState(null)

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
      setRoverData(e.target.value);
    }

  useEffect(()=>{
    const APICallAPOD = () =>{
      axios.get(`${NASA_URL}planetary/apod?date=${actualDate}&api_key=${NASA_API_KEY}`)
      .then(res =>{
        setData(res.data)
      }).catch(err =>{
        throw new Error('Error')
      })
    }
    // APICallAPOD() 
  }, [actualDate])

  useEffect(()=>{
    if(roverData == "mars-rover-photo"){
      const APICallRovers = () =>{
        console.log("Llamando API ROVERS")
        // axios.get(`${NASA_URL}mars-photos/api/v1/rovers/curiosity/photos?earth_date=${actualDate}&api_key=${NASA_API_KEY}`)
        // .then(res =>{
        //   // setRoverData(res.data)
        //   console.log(res)
        // }).catch(err =>{
        //   throw new Error('Error')
        // })
      }
      APICallRovers()
    }
  }, [roverData])

  useEffect(()=>{
    if (data){
      document.body.style.height = "100%";
    }else{
      document.body.style.height = "100vh";
    }
  }, [data])

  return (
    <div className="App">
        <div className="image">
            <img className='logo_nasa' src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/800px-NASA_logo.svg.png" alt="Image of the day"></img>
        </div>
        {/* <Loading/> */}
        {data ? (
        <Figure 
        actualDate={actualDate} 
        data={data} 
        handleNewDate={handleNewDate}
        handleNewSelectOption={handleNewSelectOption}
        />) : (<Loading/>)}
      </div>
  )
}

export default App
