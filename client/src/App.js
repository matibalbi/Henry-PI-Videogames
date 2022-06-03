import React from "react"
import './App.css';
import {Route, Switch} from "react-router-dom"
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import VideogameDetail from "./components/VideogameDetail/VideogameDetail";
import CreateVideogame from "./components/CreateVideogame/CreateVideogame";
import Error404 from "./components/Error404/Error404";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/videogame/:id" component={VideogameDetail} />
        <Route path="/createVideogame" component={CreateVideogame} />
        <Route path="*" component={Error404} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
