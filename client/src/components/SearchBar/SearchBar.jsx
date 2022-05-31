import {useState} from "react";
import {useDispatch} from "react-redux"
import {getVideogamesSearch} from "../../redux/actions";
import './SearchBar.css'

const SearchBar = () => {

  const [videogame, setVideogame] = useState("");

  const dispatch = useDispatch()

  const handleInputChange = e => {
    setVideogame(e.target.value);
 }

 const handleSubmit = e => {
    e.preventDefault();
    if (videogame) {
        dispatch(getVideogamesSearch(videogame))
        setVideogame("")
    }
 }

  return (
    <form className='containerSearch' onSubmit={handleSubmit}>
      <input
        placeholder="Search videogame..."
        value={videogame}
        onChange={handleInputChange}
        className='search'
      />
      <button type="submit" className='search'>Search</button>
    </form>
  );
}

export default SearchBar;