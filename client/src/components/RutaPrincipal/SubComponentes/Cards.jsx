import React from 'react';
import './Cards.css';
import Card from './Card.jsx';

export default function Cards({countries,cargado}) {
  let fraseNoResultados="No se encontraron resultados"
  if(!cargado)
  fraseNoResultados="Cargando..."

  if(countries.length===0){
    return (
    <div className='cards'>
      <p><b>{fraseNoResultados}</b></p>
    </div>
    )
  }
  else {
  return (
    <div className='cards'>
      {countries.map(c => <Card
          key={c.id}
          id={c.id}
          nombre={c.nombre}
          continente={c.continente}
          bandera={c.bandera}
          creador={c.creador}
        /> )}
    </div>
  )
  }
}
