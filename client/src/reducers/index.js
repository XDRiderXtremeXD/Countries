const initialState = {
  //  moviesFavourites: [],
    filtroContinente:"Todos",
    filtroActividadTuristica:"Todas",
    filtroAlfPob:"Alfabético",
    filtroDireccion:"Ascendente",
    countriesLoaded: [],
    page:1,
    nombrePais:"",
    actividades:[],
    whathCountries:[],
    CountriesActivities:{},
    cargado:false
    //movieDetail: {}
}


function Obteneractividades(countriesactividades){
    let copyactividades=[];
       if(Array.isArray(countriesactividades)){
        for (const countries of countriesactividades) {
            let actividadesEvalua=countries.activities;
        if(Array.isArray(actividadesEvalua))
        for(const actividad of actividadesEvalua){
          if(!copyactividades.includes(actividad.nombre))
          copyactividades.push(actividad.nombre);
        }
      }
    }
   return copyactividades;
}

function filtradoDeCountries(countries){
    let arregloCountries=countries.countriesLoaded;
    if(countries.filtroContinente!=="Todos")
    arregloCountries=countries.countriesLoaded.filter(countrie => countrie.continente===countries.filtroContinente);
    //ORDENAR POR ACTIVIDAD TURISCA
    if(countries.filtroActividadTuristica!=="Todas"){
        let arregloActividades=[];
    for (const iterator of arregloCountries) {
        for (const iterator2 of iterator.activities) {
            if(iterator2.nombre===countries.filtroActividadTuristica){
            arregloActividades.push(iterator);
            break
         }
        }
    }
    arregloCountries=arregloActividades
    }
    //ORDENAR POR POBLACION O ALFABETICO
        for (let index = 0; index < arregloCountries.length; index++) {
            let primerValor=arregloCountries[index];
            let indiceMenor=index;
            for (let index2 = index+1; index2 < arregloCountries.length; index2++) {
            let valor=(countries.filtroAlfPob==="Alfabético"?arregloCountries[index2].nombre:arregloCountries[index2].poblacion);
            if((countries.filtroAlfPob==="Alfabético"?arregloCountries[indiceMenor].nombre:arregloCountries[indiceMenor].poblacion)>valor)
              indiceMenor=index2  
            }
        arregloCountries[index]=arregloCountries[indiceMenor];
        arregloCountries[indiceMenor]=primerValor;
        } 
    
    //ORDENAR POR DIRECCION
    if(countries.filtroDireccion==="Descendente")
    arregloCountries.reverse();

    return arregloCountries;
}


function rootReducer (state = initialState, action){
switch(action.type){
    case "GET_COUNTRIES":
        var countries=filtradoDeCountries({...state,countriesLoaded:action.payload.countries})
        var actividades=Obteneractividades(action.payload.countries);
        return{
            ...state,
            countriesLoaded: action.payload.countries,
            page: action.payload.page,
            nombrePais: action.payload.searchName,
            actividades:actividades,
            whathCountries:countries,
            cargado:action.payload.cargado,
        }
    case "CHANGE_PAGE":
    return{
        ...state,
        page:action.payload,
      // moviesFavourites: [...state.moviesFavourites, action.payload]
    }
    case "CHANGE_FILTER": 
     countries=filtradoDeCountries({...state,[action.payload.propiedad]:action.payload.cambio})
    return{
        ...state,
        [action.payload.propiedad]:action.payload.cambio,
        whathCountries:countries,
        page:1
      // moviesFavourites: [...state.moviesFavourites, action.payload]
    }
    case "GET_COUNTRIESACTIVITIES":
    return{
        ...state,
        CountriesActivities:action.payload
      // moviesFavourites: [...state.moviesFavourites, action.payload]
    }

    case "CLEAR_DETAIL_COUNTRIES":
    return{
        ...state,
        CountriesActivities:[]
      // moviesFavourites: [...state.moviesFavourites, action.payload]
    }
    case "PUT_LOADING":
    return{
        ...state,
        cargado:action.payload.cargado
      // moviesFavourites: [...state.moviesFavourites, action.payload]
    }
   /* case "ADD_MOVIE_FAVORITE": 
    return{
        ...state,
        moviesFavourites: state.moviesFavourites.concat(action.payload)
      // moviesFavourites: [...state.moviesFavourites, action.payload]
    }
    case "REMOVE_FAVORITE":
        return{
            ...state,
            moviesFavourites: state.moviesFavourites.filter(movie => movie.id !== action.payload)
        }
    case "GET_DETAIL":
        console.log({...state,movieDetail:action.payload})
        return{
            ...state,
            movieDetail: action.payload
        }
    case "CLEAR_DETAIL":
        console.log({...state,movieDetail:{}})
        return{
            ...state,
            movieDetail: {}
        }*/
        default: 
        return state
}

}

export default rootReducer