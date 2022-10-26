import React from 'react';
import './CardCountry.css';

export default function Card ({nombre,dificultad, duracion, temporada}) {

    return (
      <div  className={temporada}>
        <div className="card-body">
          {/*<h5 className="card-title">{name}</h5>*/}
          <div className="row">
            <div >
              <p>Nombre: {nombre}</p>
            </div>
            <div >
              <p>Dificultad: {dificultad}</p>
            </div>
            <div >
              <p>Duracion(meses): {duracion}</p>
            </div>
            <div >
              <p>Temporada: {temporada}</p>
            </div>
          </div>
        </div>
      </div>
    );
};
