// APIKEY = 1bc6c554
const API_URL = process.env.REACT_APP_API_URL;

export function getcountries(nombrePais,pagina){
    console.log("URL ",API_URL);
    console.log("Prueba");
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
var url = '${API_URL}/activities';
          fetch(url, {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {objec}!
          headers:{
          'Content-Type': 'application/json'
          }
          }).then(res => res.json())
          .catch(error => { throw new Error('Error',error)})
          .then(response => console.log('Success:', response));
    return
 }

/*
        return axios.get(`http://www.omdbapi.com/?apikey=1bc6c554&s=${titulo}`)
          .then(res => res.data)
          .then(res =>
            {
          dispatch({type: "GET_MOVIES", payload: res})
      })

*/
/*
export function addMovieFavorite (payload) {
return{
type: "ADD_MOVIE_FAVORITE",
payload: payload
}
}

export function removeMovieFavorite(id){
return{
    type: "REMOVE_FAVORITE",
    payload: id
}
}

export function getMovieDetail(id){
    return function (dispatch){
        return fetch (`http://www.omdbapi.com/?apikey=1bc6c554&i=${id}`)
        .then(res => res.json())
        .then(res => {
            dispatch({type: "GET_DETAIL", payload: res})
        })
    }
}

export function clearDetail() {
    return{
        type: "CLEAR_DETAIL"
    }
}*/