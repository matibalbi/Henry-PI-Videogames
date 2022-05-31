import axios from 'axios';
import {useState} from 'react';
import {useSelector} from "react-redux"

const CreateVideogame = () => {

   const platforms = ["Android", "Game Boy", "GameCube", "iOS", "Nintendo 64", "Nintendo DS", "Nintendo Switch", "PC", "PlayStation", "PlayStation 2",
   "PlayStation 3", "PlayStation 4", "PlayStation 5", "PS Vita", "PSP", "SEGA", "Wii", "Xbox", "Xbox 360", "Xbox One", "Xbox Series S/X"]
   
   const genres = useSelector(state => state.genres)

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

   const handleInputChange = e => {
      setInput({
        ...input,
        [e.target.name]: e.target.value
      });
      setErrors(validate({
         ...input,
         [e.target.name]: e.target.value
      }));
   }

   const handleSelectChange = e => {
      const selected = input[e.target.name]
      if (!selected.includes(e.target.value)) {
         selected.push(e.target.value)
         setInput({
            ...input,
            [e.target.name]: selected
         })
         setErrors(validate({
            ...input,
            [e.target.name]: selected
         }));
      }
   }
   
   const deleteChoice = (category, value) => {
      const newValues = input[category].filter(e => e !== value)
      setInput({
         ...input,
         [category]: newValues
      })
      setErrors(validate({
         ...input,
         [category]: newValues
      }))
   }

   const handleSubmit = e => {
      e.preventDefault();
      axios.post('http://localhost:3001/videogame', input)
      .then(res => {
         if (res.status === 201) alert('Videogame created successfully')
      })
   }

   const validate = input => {
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
               <select defaultValue="select" name="genres" onChange={handleSelectChange}>
                  <option value="select" disabled hidden>Select...</option>
                  {genres.map((genre) => (
                     <option key={genre.id} value={genre.name}>{genre.name}</option>
                  ))}
               </select>
               {input.genres.map((genre, i) => (
                  <div key={i}>
                     <button type="button" onClick={() => deleteChoice("genres", genre)}>X</button>
                     <span>{genre}</span>
                  </div>
               ))}
               {errors.genres && (<span>{errors.genres}</span>)}
            </div>

            <div>
               <label>Platforms: </label>
               <select defaultValue="select" name="platforms" onChange={handleSelectChange}>
                  <option value="select" disabled hidden>Select...</option>
                  {platforms.map((platform, i) => (
                     <option key={i} value={platform}>{platform}</option>
                  ))}
               </select>
               {input.platforms.map((platform, i) => (
                  <div key={i}>
                     <button type="button" onClick={() => deleteChoice("platforms", platform)}>X</button>
                     <span>{platform}</span>
                  </div>
               ))}
               {errors.platforms && (<span>{errors.platforms}</span>)}
            </div>

            <button type="submit" disabled={Object.keys(errors).length || !input.name ? true : false}>Create Videogame</button>
         </form>
      </div>
   );
};

export default CreateVideogame;