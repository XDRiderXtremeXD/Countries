import React, { Component } from "react";
import { connect } from "react-redux";
import {getDetailsCountry,clearDetailsCountry} from '../../actions'
import Cards from './CardsCountry.jsx';
import './Countries.css';
import { Link } from 'react-router-dom';

class Countries extends Component {
  componentDidMount(){
    const id = this.props.match.params.id
    this.props.getDetailsCountry(id)
  }
  componentWillUnmount(){
    this.props.clearDetailsCountry()
}


  render() {
    var countrie=this.props.countriesActivities;
  if(countrie)
   return (
    <div>
        <Link to="/countries">
          <button className='boton-home' >Atras</button>
        </Link>
    <div className="countrys-body">
          {/*<h5 className="card-title">{name}</h5>*/}
          <div className="countrys-body-Datos">
          <div >
              <img className="bandera" src={countrie.bandera} width="80" height="80" alt="" />
            </div>
            <div >
              <p>Nombre: {countrie.nombre}</p>
            </div>
            <div >
              <p>Continente: {countrie.continente}</p>
            </div>
            <div >
              <p>SubRegion: {countrie.subregion}</p>
            </div>
            <div >
              <p>Capital: {countrie.capital}</p>
            </div>
            <div>
              <p>Area m2: {countrie.area}</p>
            </div>
            <div >
              <p>Población: {countrie.poblacion}</p>
            </div>
            <div >
              <p>Creador: {countrie.creador}</p>
            </div>
          </div>
          { countrie.activities && <Cards activities={countrie.activities}/> }
      </div>
   </div>
  )
  else
  return(
    <div className="col-sm-4 col-md-4 col-lg-4">
       <p>Error al cargar la base de datos:</p>
    </div>
  )
  }
}

function mapStateToProps(state){
  return{
    countriesActivities: state.CountriesActivities}
}
  
function mapDispatchToProps(dispatch){
    //pasandole al componente la posibilidad como props de hacer un dispatch de la function getcountries
  return{
    getDetailsCountry: (id) => dispatch(getDetailsCountry(id)),
    clearDetailsCountry: () => dispatch(clearDetailsCountry()),
  }
}
  
  
                          //las propiedades del estado que quiero conectar //las acciones que quiero poder dispatchar
  export default connect(mapStateToProps, mapDispatchToProps)(Countries);