import React from 'react'

const ErrorComponent = () => {
  return (
    <div className="App">
      <div className="image">
        <img className='logo_nasa' src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/800px-NASA_logo.svg.png" alt="Image of the day"></img>
      </div>
      <div className="title">
        <h1>Imagen astronómica del día</h1>
      </div>
      <div className="info_container">
        <div className='input'>
          <label className='date_text'>Selecciona una fecha: </label>
          <input type="date" id="date" name="date" max={today} value={actualDate} onChange={handleNewDate} />
        </div>
        <div className="image_info">
          <h2>Foto del día - 03/08/2020</h2>
          <p className='author'>Author: Alejandro Luzuriaga</p>
        </div>
        <div className="element-image">
          <img className='nasa_photo' src="#" alt="Error ❌"></img>
        </div>
        <TextoExpansible contenido="Selecciona una fecha menor a hoy" longitudMaxima={100}/>
      </div>
    </div>
  )
}

export default ErrorComponent