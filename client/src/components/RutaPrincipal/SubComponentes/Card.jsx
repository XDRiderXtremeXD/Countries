import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

export default function Card ({id,bandera, nombre, continente,creador}) {
    return (
      <div className="card">
        <div className="card-body">
          {/*<h5 className="card-title">{name}</h5>*/}
          <div className="row">
            <div >
              <p>{nombre}</p>
            </div>
            <div >
              <p>{continente}</p>
            </div>
            <div >
              <img className="bandera" src={bandera} width="80" height="80" alt="" />
            </div>
          </div>
        <Link to={`/countries/${id}`}>
          <button className="botonDetalle">Detalles</button>
        </Link>
        </div>
      </div>
    );
};
