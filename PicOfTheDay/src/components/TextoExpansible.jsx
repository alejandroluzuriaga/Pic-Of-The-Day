import React, {useState} from 'react'

const TextoExpansible = ({contenido, longitudMaxima}) => {
    const [expandido, setExpandido] = useState(false);
    const texto = contenido;
    const longitud = longitudMaxima;
    const mostrarBotones = (contenido.length > longitudMaxima);
  
    function toggleExpandido() {
      setExpandido(!expandido);
    }
  
    let textoMostrado;
    let botonTexto;
    if (expandido) {
      textoMostrado = texto;
      botonTexto = "Mostrar menos";
    } else {
      textoMostrado = texto.substring(0, longitud) + "...";
      botonTexto = "Mostrar más";
    }

  return (
    <div className='texto'>
      <p className='description-text'>{textoMostrado}</p>
      {mostrarBotones && (
        <button className='show-button' onClick={toggleExpandido}>{botonTexto}</button>
      )}
    </div>
  )
}

export default TextoExpansible;