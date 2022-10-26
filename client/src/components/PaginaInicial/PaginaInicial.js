import React from 'react';
import { Link } from 'react-router-dom';
import './PaginaInicial.css';


export default function PaginaInicial() {
  return (
      <div className="paginainicial">
          <Link to="/countries">
          <button className='button-home' >Countries</button>
        </Link>
      </div>
  )
}