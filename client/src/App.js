import './App.css';
import {Route, Switch} from "react-router-dom"
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <h1>Henry Videogames</h1>
      <Home/>
    </div>
  );
}

export default App;
