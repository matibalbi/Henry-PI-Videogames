import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from 'react-router-dom';
import {  getVideogamesFromDB, resetUpdate, setLoadingVideogamesDB } from '../../redux/actions';
import Error404 from '../Error404/Error404';
import NavBar from "../NavBar/NavBar";
import './UpdateVideogame.css'

const UpdateVideogame = (props) => {

   const genres = useSelector(state => state.genres)
   const videogameUpdate = useSelector(state => state.videogameUpdate)

   const id = props.match.params.id
   
   const platforms = ["Android", "Game Boy", "GameCube", "iOS", "Nintendo 64", "Nintendo DS", "Nintendo Switch", "PC", "PlayStation", "PlayStation 2",
   "PlayStation 3", "PlayStation 4", "PlayStation 5", "PSP", "SEGA", "Wii", "Xbox", "Xbox 360", "Xbox One", "Xbox Series S/X"]

   const released = videogameUpdate.released ? videogameUpdate.released : ''
   const rating = videogameUpdate.rating ? videogameUpdate.rating : ''

   const [input, setInput] = useState({
      name: videogameUpdate.name,
      image: videogameUpdate.image,
      description: videogameUpdate.description,
      released: released,
      rating: rating,
      genres: videogameUpdate.genres,
      platforms: videogameUpdate.platforms
   });

   const [errors, setErrors] = useState({});

   const [redirect, setRedirect] = useState(false);
   
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

   const dispatch = useDispatch()

   useEffect(() => {
    return () => {
        dispatch(resetUpdate())
    }
    }, [dispatch])

   const handleSubmit = e => {
      e.preventDefault();
      axios.put(`http://localhost:3001/videogame/${id}/update`, input)
      .then(res => {
         if (res.status === 201) {
            dispatch(setLoadingVideogamesDB(true))
            dispatch(getVideogamesFromDB())
            alert('Videogame updated successfully')
            setRedirect(true)
         }
      })
      .catch(error => alert(error.message))
    }

   const validate = input => {
      let errors = {};
      if (!input.name) errors.name = 'Name is required'
      else if (!/^[^@#$%^&]+$/.test(input.name)) errors.name = 'Name must not contain special characters (@#$%^&)'
      if (!input.description) errors.description = 'Description is required'
      if (!input.genres.length) errors.genres = 'You must select at least one genre'
      if (input.released && !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(input.released)) errors.released = 'Release date must be in the format yyyy-mm-dd'
      if (input.rating < 0 || input.rating > 5) errors.rating = 'Rating must be a number between 0 and 5';
      if (input.image && !/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) errors.image = "Image URL must have a valid URL format (http/https/ftp)"
      else if (input.image && !/(\.|=)(jpg|png|gif)$/i.test(input.image)) errors.image = "Image URL must have a valid image format (jpg/png/gif)"
      if (!input.platforms.length) errors.platforms = 'You must select at least one platform'
      return errors;
   };

   const disabled = Object.keys(errors).length || !input.name

   if (id.length !== 36) return <Error404 />

   if (redirect) return <Redirect to='/home' />
   
   return (
      <div className='backgroundUpdate'>
         <br></br>
         <NavBar />
         <div className='containerUpdate'>
            <form onSubmit={handleSubmit} className='containerForm'>
               <div className='containerUpdateTitle'>
                  <h3 className='titleUpdate'>&#127918; Update your video game! &#127918;</h3>
               </div>
               <div className='containerUpdateBody'>
                  <div className='columnsForm'>
                     <div>
                        <label className='fontBodyUpdate blockUpdate'>Name: </label>
                        <input
                           name="name"
                           value={input.name}
                           className='inputName'
                           onChange={handleInputChange}
                           autoComplete="off"
                        />
                        {errors.name && (<span className='fontErrorsUpdate'>{errors.name}</span>)}
                     </div>
                     <br></br>
                     
                     <div>
                        <label className='fontBodyUpdate blockUpdate'>Description: </label>
                        <textarea
                           name="description"
                           value={input.description}
                           className='inputDescription'
                           onChange={handleInputChange}
                           autoComplete="off"
                        />
                        {errors.description && (<span className='fontErrorsUpdate'>{errors.description}</span>)}
                     </div>
                     <br></br>
                     
                     <div>
                        <label className='fontBodyUpdate blockUpdate'>Genres: </label>
                        <select defaultValue="select" id="selectGenreUpdate" name="genres" onChange={handleSelectChange}>
                           <option value="select" disabled hidden>Select...</option>
                           {genres.map((genre) => (
                              <option key={genre.id} value={genre.name}>{genre.name}</option>
                           ))}
                        </select>
                        <div className='containerListUpdate'>
                           <div>
                              {input.genres.map((genre, i) => {
                                 if (i < 7) return (
                                    <div key={i} className='listUpdate'>
                                       <span className='fontBodyUpdate fontWeightLight'>{genre}</span>
                                       <button type="button" className='eraseUpdate' onClick={() => deleteChoice("genres", genre)}>X</button>
                                    </div>
                                 )
                                 return <div></div>
                              })}
                           </div>
                           <div>
                              {input.genres.length >= 8 && input.genres.map((genre, i) => {
                                 if (i >= 7 && i < 14) return (
                                 <div key={i} className='listUpdate'>
                                    <span className='fontBodyUpdate fontWeightLight'>{genre}</span>
                                    <button type="button" className='eraseUpdate' onClick={() => deleteChoice("genres", genre)}>X</button>
                                 </div>
                                 )
                                 return <div></div>
                              })}
                           </div>
                           <div>
                              {input.genres.length >= 15 && input.genres.map((genre, i) => {
                                 if (i >= 14) return (
                                 <div key={i} className='listUpdate'>
                                    <span className='fontBodyUpdate fontWeightLight'>{genre}</span>
                                    <button type="button" className='eraseUpdate' onClick={() => deleteChoice("genres", genre)}>X</button>
                                 </div>
                                 )
                                 return <div></div>
                              })}
                           </div>
                        </div>
                        {errors.genres && (<span className='fontErrorsUpdate'>{errors.genres}</span>)}
                     </div>
                  </div>
                  
                  <div className='columnsForm'>
                     <div>
                        <label className='fontBodyUpdate blockUpdate'>Release date: </label>
                        <input
                           name="released"
                           value={input.released}
                           className='inputRelease'
                           onChange={handleInputChange}
                           autoComplete="off"
                        />
                        {errors.released && (<span className='fontErrorsUpdate'>{errors.released}</span>)}
                     </div>
                     <br></br>

                     <div>
                        <label className='fontBodyUpdate blockUpdate'>Rating: </label>
                        <input
                           type="number"
                           step="0.1"
                           name="rating"
                           value={input.rating}
                           className='inputRating'
                           onChange={handleInputChange}
                           autoComplete="off"
                        />
                        {errors.rating && (<span className='fontErrorsUpdate'>{errors.rating}</span>)}
                     </div>
                     <br></br>

                     <div>
                        <label className='fontBodyUpdate blockUpdate'>Image URL: </label>
                        <input
                           name="image"
                           value={input.image}
                           className='inputImgURL'
                           onChange={handleInputChange}
                           autoComplete="off"
                           />
                        {errors.image && (<span className='fontErrorsUpdate'>{errors.image}</span>)}
                     </div>
                     <br></br>
                     
                     <div>
                        <label className='fontBodyUpdate blockUpdate'>Platforms: </label>
                        <select defaultValue="select" name="platforms" onChange={handleSelectChange}>
                           <option value="select" disabled hidden>Select...</option>
                           {platforms.map((platform, i) => (
                              <option key={i} value={platform}>{platform}</option>
                           ))}
                        </select>
                        <div className='containerListUpdate'>
                           <div>
                              {input.platforms.map((platform, i) => {
                                 if (i < 7) return (
                                    <div key={i} className='listUpdate'>
                                       <span className='fontBodyUpdate fontWeightLight'>{platform}</span>
                                       <button type="button" className='eraseUpdate' onClick={() => deleteChoice("platforms", platform)}>X</button>
                                    </div>
                                 )
                                 return <div></div>
                              })}
                           </div>
                           <div>
                              {input.platforms.length >= 8 && input.platforms.map((platform, i) => {
                                 if (i >= 7 && i < 14) return (
                                 <div key={i} className='listUpdate'>
                                    <span className='fontBodyUpdate fontWeightLight'>{platform}</span>
                                    <button type="button" className='eraseUpdate' onClick={() => deleteChoice("platforms", platform)}>X</button>
                                 </div>
                                 )
                                 return <div></div>
                              })}
                           </div>
                           <div>
                              {input.platforms.length >= 15 && input.platforms.map((platform, i) => {
                                 if (i >= 14) return (
                                 <div key={i} className='listUpdate'>
                                    <span className='fontBodyUpdate fontWeightLight'>{platform}</span>
                                    <button type="button" className='eraseUpdate' onClick={() => deleteChoice("platforms", platform)}>X</button>
                                 </div>
                                 )
                                 return <div></div>
                              })}
                           </div>
                        </div>
                        {errors.platforms && (<span className='fontErrorsUpdate'>{errors.platforms}</span>)}
                     </div>
                  </div>
               </div>
               <div className='containerButtonUpdate'>
                  <button type="submit" disabled={disabled} className={disabled ? 'updateDisabled' : 'updateActive'}>Update</button>
               </div>
               </form>
            </div>
      </div>
   );
};

export default UpdateVideogame;