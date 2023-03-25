import React, { useState } from 'react'
import TextoExpansible from './TextoExpansible'

const today = new Date(Date.now()).toISOString().slice(0, 10);

const handleNewDate = (e) => {
    const enteredDate = new Date(e.target.value);
    const todayDate = new Date(today);
    if (!(enteredDate > todayDate)) {
      props.updateDate(e.target.value.toLocaleString());
    }
  };

const handleNewSelectOption = (e) => {
    props.handleNewSelectOption(e);
  }

const Figure = ({actualDate, data, handleNewDate, handleNewSelectOption}) => {
  return (
    <div>
        <div className="title">
            <h1>Astronomic image of the day</h1>
        </div>
        <div className="info_container">
          <div className="select_container">
          <select className='select' onChange={handleNewSelectOption}>
            <option value="nasa" defaultValue>NASA</option>
            <option value="mars-rover-photo">Mars Rover Photo</option>
          </select>
          </div>
            <div className='input'>
                <label className='date_text'>Pick a date: </label>
                <input type="date" id="date" name="date" max={today} value={actualDate} onChange={handleNewDate} />
            </div>
            <div className="image_info">
                <h2>Pic of the day: {data.date}</h2>
                <p className='author'>Title: {data.title}</p>
            </div>
            <div className="element-image">
                <img className='nasa_photo' src={data.url} alt="Image of the day"></img>
            </div>
            <TextoExpansible contenido={data.explanation} longitudMaxima={80}/>
        </div>
    </div>
  )
}

export default Figure