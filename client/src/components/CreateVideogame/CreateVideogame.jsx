import axios from 'axios';
import { useState } from 'react';

function CreateVideogame() {

   const [input, setInput] = useState({
      name: '',
      image: '',
      description: '',
      released: '',
      rating: '',
      genres: [],
      platforms: []
   });

   const [errors, setErrors] = useState({});

   const handleInputChange = function(e) {
      setInput({
        ...input,
        [e.target.name]: e.target.value
      });
      setErrors(validate({
         ...input,
         [e.target.name]: e.target.value
      }));
   }

   const handleSelectChange = function(e) {
      const options = e.target.options
      const selected = []
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selected.push(options[i].value)
        }      
      }
      setInput({
         ...input,
         [e.target.name]: selected
      })
      setErrors(validate({
         ...input,
         [e.target.name]: selected
      }));
   }

   const handleSubmit = function(e) {
      e.preventDefault();
      axios.post('http://localhost:3001/videogames', input)
      .then(res => {
         if (res.status === 201) alert('Videogame created successfully')
      })
   }

   const validate = function(input) {
      let errors = {};
      if (!input.name) errors.name = 'Name is required'
      else if (!/^[^@#$%^&]+$/.test(input.name)) errors.name = 'Name must not contain the following special characters: @#$%^&)'
      if (!input.description) errors.description = 'Description is required'
      if (input.released && !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(input.released)) errors.released = 'Release date must be in the format yyyy-mm-dd'
      if (input.rating < 0 || input.rating > 5) errors.rating = 'Rating must be a number between 0 and 5';
      if (!input.genres.length) errors.genres = 'You must select at least one genre'
      if (!input.platforms.length) errors.platforms = 'You must select at least one platform'
      return errors;
    };

  return (
      <div>
         <div>Create Videogame</div>
         <form onSubmit={handleSubmit}>
            <div>
               <label>Name: </label>
               <input
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
               />
               {errors.name && (<span>{errors.name}</span>)}
            </div>
            <div>
               <label>Description: </label>
               <textarea
                  name="description"
                  value={input.description}
                  onChange={handleInputChange}
               />
               {errors.description && (<span>{errors.description}</span>)}
            </div>
            <div>
               <label>Release date: </label>
               <input
                  name="released"
                  value={input.released}
                  onChange={handleInputChange}
               />
               {errors.released && (<span>{errors.released}</span>)}
            </div>
            <div>
               <label>Rating: </label>
               <input
                  type="number"
                  name="rating"
                  value={input.rating}
                  onChange={handleInputChange}
               />
               {errors.rating && (<span>{errors.rating}</span>)}
            </div>
            <div>
               <label>Image URL: </label>
               <input
                  name="image"
                  value={input.image}
                  onChange={handleInputChange}
                  />
            </div>
            <div>
               <label>Genres: </label>
               <select multiple size="8" name="genres" value={input.genres} onChange={handleSelectChange}>
                  <option>Action</option>
                  <option>Indie</option>
                  <option>Adventure</option>
                  <option>RPG</option>
                  <option>Strategy</option>
                  <option>Shooter</option>
                  <option>Casual</option>
                  <option>Simulation</option>
                  <option>Puzzle</option>
                  <option>Arcade</option>
                  <option>Platformer</option>
                  <option>Racing</option>
                  <option>Massively Multiplayer</option>
                  <option>Sports</option>
                  <option>Fighting</option>
                  <option>Family</option>
                  <option>Board Games</option>
                  <option>Educational</option>
                  <option>Card</option>
               </select>
               {errors.genres && (<span>{errors.genres}</span>)}
               {/* Géneros seleccionados:{input.genres.map((genre) => {
                  return (<p>{genre}</p>)
               }
               )} */}
            </div>
            <div>
               <label>Platforms: </label>
               <select multiple size="8" name="platforms" value={input.platforms} onChange={handleSelectChange}>
                  <option>Android</option>
                  <option>Game Boy</option>
                  <option>GameCube</option>
                  <option>iOS</option>
                  <option>Nintendo 64</option>
                  <option>Nintendo DS</option>
                  <option>Nintendo Switch</option>
                  <option>PC</option>
                  <option>PlayStation</option>
                  <option>PlayStation 2</option>
                  <option>PlayStation 3</option>
                  <option>PlayStation 4</option>
                  <option>PlayStation 5</option>
                  <option>PS Vita</option>
                  <option>PSP</option>
                  <option>SEGA</option>
                  <option>Wii</option>
                  <option>Xbox</option>
                  <option>Xbox 360</option>
                  <option>Xbox One</option>
                  <option>Xbox Series S/X</option>
               </select>
               {errors.platforms && (<span>{errors.platforms}</span>)}
            </div>
            <button type="submit" disabled={Object.keys(errors).length? true : false}>Create Videogame</button>
         </form>
      </div>
   );
};

export default CreateVideogame;