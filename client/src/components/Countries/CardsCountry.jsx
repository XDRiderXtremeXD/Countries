import React from 'react';
import Card from './CardCountry.jsx';
import './CardsCountry.css';

export default function Cards({activities}) {
  if(activities.length===0){
    return (
    <div className='cards'>
      <p><b>No se encontraron actividades</b></p>
    </div>
    )
  }
  else {
  return (
    <div className='body-countries-actividades'>
      {activities.map(c => <Card
          key={c.id}
          nombre={c.nombre}
          dificultad={c.dificultad}
          duracion={c.duracion}
          temporada={c.temporada}
        /> )}
    </div>
  )
  }
}
