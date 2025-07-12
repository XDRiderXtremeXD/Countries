// APIKEY = 1bc6c554
const API_URL = process.env.REACT_APP_API_URL;

export function getcountries(nombrePais,pagina){
    return function (dispatch){
      let getData=nombrePais?`${API_URL}/countries/?name=${nombrePais}`:
      `${API_URL}/countries/`

    return fetch (getData)
      .then(res => res.json())
      .then(json =>{
          dispatch({type: "GET_COUNTRIES", payload: {countries:json,searchName:nombrePais,page:pagina,cargado:true}})
      }).catch({type: "PUT_LOADING", payload: {cargado:false}});    
    }
}

export function getDetailsCountry(id){
    return function (dispatch){
      let url=`${API_URL}/countries/${id}`
    return fetch (url)
      .then(res => res.json())
      .then(json =>{
          dispatch({type: "GET_COUNTRIESACTIVITIES", payload: json})
      }).catch(console.log("cargandoo"));    
    }
}

export function clearDetailsCountry(id){
    return{
        type: "CLEAR_DETAIL_COUNTRIES"
    }
}

export function changePage(cambiarPagina){
    return function (dispatch){
          dispatch({type: "CHANGE_PAGE", payload: cambiarPagina})   
    }
}


export function cambioFiltro(e,propiedad){
    e.preventDefault();
    let Objeto={cambio:e.target.value,propiedad:propiedad};
    return function (dispatch){
        dispatch({type: "CHANGE_FILTER", payload: Objeto}) 
  }
}


export function postData(data){
  var url = `${API_URL}/activities`; // ✅ Usar backticks

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(error => { throw new Error('Error', error) })
  .then(response => console.log('Success:', response));

  return;
}
