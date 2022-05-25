import React from "react"
import './App.css';
import {Route, Switch} from "react-router-dom"
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import VideogameDetail from "./components/VideogameDetail/VideogameDetail";
import NavBar from "./components/NavBar/NavBar";
import CreateVideogame from "./components/CreateVideogame/CreateVideogame";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Landing} />
        <NavBar />
      </Switch>
      <Route path="/home" component={Home} />
      <Route path="/videogame/:id" component={VideogameDetail} />
      <Route path="/createVideogame" component={CreateVideogame} />
    </React.Fragment>
  );
}

export default App;
