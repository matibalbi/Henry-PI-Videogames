import { useState } from 'react';

function CreateVideogame() {

   const [input, setInput] = useState({
      name: '',
      description: '',
      released: '',
      rating: '',
      genres: [''],
      platforms: ['']
   });

   const handleInputChange = function(e) {
      setInput({
        ...input,
        [e.target.name]: e.target.value
      });
   }

   const handleSubmit = function(e) {
      e.preventDefault();
      fetch('http://localhost:3001/videogames', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
    });
   }

   const handleSelectChange = function(e) {
      const opciones = e.target.options
      const seleccionadas = []
      for (let i = 0; i < opciones.length; i++) {
        if (opciones[i].selected) {
          seleccionadas.push(opciones[i].value)
        }      
      }
      setInput({
         ...input,
         [e.target.name]: seleccionadas
       })
    }

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
            </div>
            <div>
               <label>Description: </label>
               <textarea
                  name="description"
                  value={input.description}
                  onChange={handleInputChange}
               />
            </div>
            <div>
               <label>Release date: </label>
               <input
                  name="released"
                  value={input.released}
                  onChange={handleInputChange}
               />
            </div>
            <div>
               <label>Rating: </label>
               <input
                  type="number"
                  name="rating"
                  value={input.rating}
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
            </div>
            <button type="submit">Create Videogame</button>
         </form>
      </div>
   );
};

export default CreateVideogame;