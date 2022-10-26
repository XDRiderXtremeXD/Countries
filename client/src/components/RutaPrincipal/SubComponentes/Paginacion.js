import React, { Component } from "react";
import { connect } from "react-redux";
import {changePage} from '../../../actions'
import './Paginacion.css';

class Paginacion extends Component { 
  
 Actualizar(){
  const SizeEnumeracion=10;
  const SizeWhachCards=10;
  let IndiceFinal=Math.floor(this.props.countries.length/SizeWhachCards)+1;
    let PaginaStart=(this.props.page-(Math.floor((SizeEnumeracion/4))))<1?1:this.props.page-Math.floor(SizeEnumeracion/2);
     PaginaStart=(IndiceFinal-PaginaStart)>(SizeEnumeracion-1)?PaginaStart:IndiceFinal-(SizeEnumeracion-1);
     PaginaStart=PaginaStart<1?1:PaginaStart;

      let IndicesArray=[];
      IndicesArray.push(1);
      let Longitud=((IndiceFinal>(SizeEnumeracion-1))?SizeEnumeracion:IndiceFinal);
      for(let i=1;i<Longitud;i++){
        if(i!==Longitud-1)
        IndicesArray.push(PaginaStart+i);
        else
        IndicesArray.push(IndiceFinal);
      }
   return {IndiceFinal:IndiceFinal,IndicesArray:IndicesArray};
 }


  CambiarPagina(pagina,IndiceFinal){
  if(pagina>0 && pagina<=IndiceFinal)
    this.props.changePage(pagina)
  }

    render() {
       const {IndiceFinal,IndicesArray}=this.Actualizar();
       return (
          <nav aria-label="Countries Pagination" className="NavPaginacion">
            <ul className="pagination">
            <li key={0} className="page-item"  id={this.props.page===1?"Inhabilitado":"Habilitado"} onClick={()=>this.CambiarPagina(this.props.page-1,IndiceFinal)}>
                  Previous
            </li> 
            { IndicesArray.map((page, index) => {  
                 return(
                 <li key={index+1} className="page-item" id={this.props.page===page?"pagSeleccionada":"pagNoSeleccionada"} onClick={()=>this.CambiarPagina(page,IndiceFinal)}>
                    {page}
                </li>)
              }) 
            }
            <li key={IndiceFinal+1} className="page-item" id={this.props.page===IndiceFinal?"Inhabilitado":"Habilitado"}  onClick={()=>this.CambiarPagina(this.props.page+1,IndiceFinal)}>
                Next
            </li> 
            </ul>
          </nav>
      ); 
       
       /*return (
          

          <div>
            <h2>Buscador</h2>
              <div id="PreviusPage" className="row">
                <button onClick={()=>this.CambiarPagina(this.props.page-1,IndiceFinal)} className="btn btn-sm btn-danger">Anterior</button>
              </div>
              <div id="NextPage" className="row">
                <button onClick={()=>this.CambiarPagina(this.props.page+1,IndiceFinal)} className="btn btn-sm btn-danger">Posterior</button>
              </div>
          </div>
        );*/
      }
}


function mapStateToProps(state){
    return{
      countries: state.whathCountries,
      page: state.page,
    }
}
    
function mapDispatchToProps(dispatch){
    //pasandole al componente la posibilidad como props de hacer un dispatch de la function getcountries
    return{
    changePage:  pagina => dispatch(changePage(pagina)),
    }
}
    
    
                            //las propiedades del estado que quiero conectar //las acciones que quiero poder dispatchar
export default connect(mapStateToProps,mapDispatchToProps)(Paginacion);
    //<Buscador countries={store.getState().countriesLoaded} getcountries={store.dispatch(getcountries(nombrePais))}/>