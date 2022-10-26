import React, { Component } from "react";
import { connect } from "react-redux";
import {getcountries,postData} from '../../actions'
import './Actividades.css';
import { Link } from 'react-router-dom';


class Actividades extends Component {
  constructor(props) {
    super(props);
    this.state = {nombreActividad:'',
                  dificultad:1,
                  duracion:1,
                  temporada:"Verano",
                  pais_seleccionado:"Afghanistan",
                  paises_seleccionados:[]};

    /*this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);*/
  }
  componentDidMount(){
    this.props.getcountries("",1)
  }


  handleChange(event,propiedad) {
    this.setState({[propiedad]:event.target.value})
  }

contieneSoloLetras(cadena) {
    let hay_una_letra=false
    for (let x = 0; x < cadena.length; x++) {
       var c = cadena.charAt(x);
        // Si no está entre a y z, ni entre A y Z, ni es un espacio
        if (!((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === ' ')) {
            return false
        }
        if(!hay_una_letra && c!==" ")
        hay_una_letra=true
    }
    if(!hay_una_letra)
    return false
  return true
}

  handleSubmit(event) {
    event.preventDefault();  
    let nombre=this.state.nombreActividad
     if(this.state.paises_seleccionados.length)
      if(nombre!==""){
        if(this.contieneSoloLetras(nombre)){
          nombre=nombre.toLowerCase()
          let objeto={paises:this.state.paises_seleccionados,nombre:nombre,
            dificultad:this.state.dificultad,duracion:this.state.duracion,temporada:this.state.temporada}
          postData(objeto)
          this.setState({paises_seleccionados:[]})
        }
      }
  }

  AgregarPais(event){
    event.preventDefault();
    if(!this.state.paises_seleccionados.includes(this.state.pais_seleccionado)){
      let nuevosPaises=[].concat(this.state.paises_seleccionados,this.state.pais_seleccionado)
      this.setState({paises_seleccionados:nuevosPaises})
    }
  }
  EliminarPais(elemento){
    const result = this.state.paises_seleccionados.filter(pais => pais!==elemento);
    this.setState({paises_seleccionados:result})
  }


  render() {
    return (
     <div>      
       <Link to="/countries">
          <button className='boton-home' >Atras</button>
        </Link>
      <form onSubmit={(e)=>this.handleSubmit(e)}>
        <div>
        <label>
          Nombre:
          <input type="text" value={this.state.nombreActividad} onChange={(e)=>this.handleChange(e,"nombreActividad")}/>
        </label>
       </div>
       <div>
        <label>
          Dificultad:
          <input type="range" min="1" max="5"value={this.state.dificultad} onChange={(e)=>this.handleChange(e,"dificultad")} />
        </label>
        </div>
        <div>
        <label>
          Duración (Meses):
          <input type="number" min="1" max="12" placeholder="meses" value={this.state.duracion} onChange={(e)=>this.handleChange(e,"duracion")} />
        </label>
        </div>
        <div>
        <label>
          Temporada:
          <select  value={this.state.temporada} onChange={(e)=>this.handleChange(e,"temporada")}>
          <option key="Verano" value="Verano">Verano</option>
          <option key="Otoño" value="Otoño">Otoño</option>
          <option key="Invierno" value="Invierno">Invierno</option>
          <option key="Primavera" value="Primavera">Primavera</option>
        </select>
        </label>
        </div>

        <div>
        <label className="addPais">
          Seleccionar Paises:
        <select  value={this.state.pais_seleccionado} onChange={(e)=>this.handleChange(e,"pais_seleccionado")}>
        { this.props.countries.map((elemento) => { 
                 return(
                  <option key={elemento.nombre} value={elemento.nombre}>{elemento.nombre}</option>)
              }) 
        }
        </select>
        <button className="addCountry" onClick={(event)=>this.AgregarPais(event)}>Agregar pais</button>
        </label>
        </div>
        <div>
        { this.state.paises_seleccionados.map((elemento) => { 
                 return(
                  <label className="paisesAgregados" onClick={()=>this.EliminarPais(elemento)}>{elemento}</label>)
              }) 
        } 
        </div>
        <input type="submit" value="Agregar Actividad" />
      </form>
      </div>
    );
  }
}
function mapStateToProps(state){
  return{
    countries: state.countriesLoaded,}
}
  
function mapDispatchToProps(dispatch){
    //pasandole al componente la posibilidad como props de hacer un dispatch de la function getcountries
  return{
     getcountries: (nombrePais,pagina) => dispatch(getcountries(nombrePais,pagina)),
     postData:(data)=>dispatch(postData(data))
  }
}
  
  
                          //las propiedades del estado que quiero conectar //las acciones que quiero poder dispatchar
  export default connect(mapStateToProps, mapDispatchToProps)(Actividades);
/*
- [ ] Un formulario __controlado con JavaScript__ con los siguientes campos:
  - Nombre
  - Dificultad
  - Duración
  - Temporada
- [ ] Posibilidad de seleccionar/agregar varios países en simultáneo
- [ ] Botón/Opción para crear una nueva actividad turística

class Actividades extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 'coconut'};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {    this.setState({value: event.target.value});  }
    handleSubmit(event) {
      alert('Your favorite flavor is: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Pick your favorite flavor:
            <select value={this.state.value} onChange={this.handleChange}>            <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }*/