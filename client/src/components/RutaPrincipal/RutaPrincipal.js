import React, { Component } from "react";
import { connect } from "react-redux";
import {getcountries,cambioFiltro} from '../../actions'
import './RutaPrincipal.css';
import { Link } from 'react-router-dom';

import Cards from './SubComponentes/Cards.jsx';
import Paginacion from "./SubComponentes/Paginacion.js";

export class RutaPrincipal extends Component {


  componentDidMount(){
    this.props.getcountries(this.props.nombrePais,this.props.page)
  }

  handleChange(event) {
    event.preventDefault();
    this.props.getcountries(event.target.value,1)
  }

  obtenerCountriesPagina(countries){
    if(countries!==undefined){
      let Inicio=(this.props.page-1)*10;
      return countries.slice(Inicio, Inicio+10);
    }
   return [];
  }
/*
  filtradoDeContinente(countries){
    let arregloCountries=countries;
    if(this.props.filtroContinente!=="Todos")
    arregloCountries=countries.filter(countrie => countrie.continente==this.props.filtroContinente);
  return arregloCountries;
  }

  filtradoDeTurismo(countries){
    if(this.props.filtroActividadTuristica!=="Todas"){
      let arregloActividades=[];
      for (const iterator of countries) {
      for (const iterator2 of iterator.actividades) {
          if(iterator2===this.props.filtroActividadTuristica){
          arregloActividades.push(iterator);
          break
          }
        }
      }
      countries=arregloActividades
    }
   return countries
  }

  filtradoDePoblacionAlfabeto(countries){
    for (let index = 0; index < countries.length; index++) {
      let primerValor=countries[index];
      let indiceMenor=index;
      for (let index2 = index+1; index2 < countries.length; index2++) {
      let valor=(this.props.filtroAlfPob==="Alfabético"?countries[index2].nombre:countries[index2].poblacion);
      if((this.props.filtroAlfPob==="Alfabético"?countries[indiceMenor].nombre:countries[indiceMenor].poblacion)>valor)
        indiceMenor=index2  
      }
      countries[index]=countries[indiceMenor];
      countries[indiceMenor]=primerValor;
    } 
   return countries
  }

  filtradoDeDireccion(countries){
    if(this.props.filtroDireccion=="Descendente")
    countries.reverse();
    return countries;
  }
*/

  render() {
    const { nombrePais } = this.props;
    /*let countries=this.filtradoDeContinente(this.props.countries)
    countries=this.filtradoDeTurismo(countries)
    countries=this.filtradoDePoblacionAlfabeto(countries)
    countries=this.filtradoDeDireccion(countries)*/
    const mostrarCountries=this.obtenerCountriesPagina(this.props.countries);

    return (
      <div>
        <nav className="menuOpciones">
         <ul className="menuOpcionesUl">
          <li className="menu">
            <label className="label" htmlFor="nombrePais">Buscar Pais: </label>
            <input
              type="text"
              id="nombrePais"
              autoComplete="off"
              value={nombrePais}
              onChange={(e) => this.handleChange(e)}
            />
          </li>
        <li className="menu">
        <p><label className="label" htmlFor="nombrePais">Continente: </label>
          <select value={this.props.filtroContinente} onChange={(e)=>this.props.cambioFiltro(e,"filtroContinente")}>
        <option value="Todos">Todos</option>
        <option value="Americas">Americas</option>
        <option value="Europe">Europe</option>
        <option value="Asia">Asia</option>
        <option value="Africa">Africa</option>
        <option value="Oceania">Oceania</option>
        </select></p>
        </li>
        
        <li className="menu">
        <p><label className="label" htmlFor="nombrePais">Actividad Turistica: </label>
          <select value={this.props.filtroActividadTuristica} onChange={(e)=>this.props.cambioFiltro(e,"filtroActividadTuristica")}>
        <option key="todas" value="Todas">Todas</option>
        { this.props.actividades.map((elemento) => { 
                 return(
                  <option key={elemento} value={elemento}>{elemento}</option>)
              }) 
        }
        </select></p>
        </li>

        <li className="menu">
        <p><label className="label" htmlFor="nombrePais">Ordenar por: </label>
          <select value={this.props.filtroAlfPob} onChange={(e)=>this.props.cambioFiltro(e,"filtroAlfPob")}>
        <option value="Alfabético">Alfabético</option>
        <option value="Población">Población</option>
        </select></p>
        </li>
      
      <li className="menu">
        <p><label className="label" htmlFor="nombrePais">Direcion Orden</label>
          <select value={this.props.filtroDireccion} onChange={(e)=>this.props.cambioFiltro(e,"filtroDireccion")}>
        <option value="Ascendente">Ascendente</option>
        <option value="Descendente">Descendente</option>
       </select></p>
       </li>
       <li className="menu">
          <Link to="/activities">
          <button className='button-activies' >Add Activities</button>
        </Link>
        </li>
      </ul>
      </nav>
          {this.props.countries && this.props.countries[0]!==undefined && (<Paginacion/>)}
         {/* Aqui tienes que escribir tu codigo para mostrar la lista de peliculas */}
        { mostrarCountries && <Cards countries={mostrarCountries} cargado={this.props.cargado}/> }
      </div>
    );
  }
}

function mapStateToProps(state){
return{
  countries: state.whathCountries,
  nombrePais: state.nombrePais,
  page: state.page,
  filtroContinente: state.filtroContinente,
  filtroActividadTuristica:state.filtroActividadTuristica,
  filtroAlfPob:state.filtroAlfPob,
  filtroDireccion:state.filtroDireccion,
  actividades:state.actividades,
  cargado:state.cargado
}
}

function mapDispatchToProps(dispatch){
  //pasandole al componente la posibilidad como props de hacer un dispatch de la function getcountries
  return{
   getcountries: (nombrePais,pagina) => dispatch(getcountries(nombrePais,pagina)),
   cambioFiltro:  (e,Filtro) => dispatch(cambioFiltro(e,Filtro)),
  }
}


                        //las propiedades del estado que quiero conectar //las acciones que quiero poder dispatchar
export default connect(mapStateToProps, mapDispatchToProps)(RutaPrincipal);
//<Buscador countries={store.getState().countriesLoaded} getcountries={store.dispatch(getcountries(nombrePais))}/>