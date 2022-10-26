import './App.css';

import React from "react";
//import Favorites from "./components/Favorites/Favorites";
import PaginaInicial from "./components/PaginaInicial/PaginaInicial";
//import NavBar from "./components/NavBar/NavBar";
import {BrowserRouter, Route} from 'react-router-dom'
import Actividades from './components/Actividades/Actividades';
import Countries from './components/Countries/Countries';
import RutaPrincipal from './components/RutaPrincipal/RutaPrincipal';
import { Provider } from "react-redux";
import store from "./store/index";
//import Movie from "./components/Movie/Movie";

function App() {
  return (
    <Provider store={store}> 
    <BrowserRouter>
      <React.Fragment>
          {/*<NavBar />*/}
          <Route exact path="/" component={PaginaInicial} />
          <Route exact path="/countries" component={RutaPrincipal} />
          <Route path="/activities" component={Actividades} />
          {<Route path="/countries/:id" component={Countries} />}
      </React.Fragment>
    </BrowserRouter>
    </Provider>
  );
}

export default App;