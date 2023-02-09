import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import LocationInfo from './components/LocationInfo';
import ResidentInfo from './components/ResidentInfo';
import getRandomLocation from "./utils/getRandomLocation";

function App() {
  
  const [location, setlocation] = useState()
  const [numberLocation, setnumberLocation] = useState(getRandomLocation())
  const [hasError, sethasError] = useState(false)
  const [listLocation, setlistLocation] = useState()
  const [isShow, setisShow] = useState(true)

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${numberLocation}`

    axios.get(url)
    .then(res => {
      setlocation(res.data)
      sethasError(false)
    })
    .catch(err => {
      console.log(err)
      sethasError(true)

    })
  }, [numberLocation])
  
  const handleSubmit = e => {
    e.preventDefault()

    if(e.target.inputLocation.value.trim().length === 0){
      setnumberLocation(getRandomLocation())
    } else {

    setnumberLocation(e.target.inputLocation.value)
  }
e.target.inputLocation.value= e.target.inputLocation.value.trim()
}

const handleChange = e => {

  const url= `https://rickandmortyapi.com/api/location/?name=${e.target.value.trim()}`
  axios.get(url)
  .then(res => setlistLocation(res.data.results))
  .catch(err => console.log(err))
}

const handleFocus= () => setisShow(true)
const handleBlur= () => setisShow(false)
const handleClickList = id => setnumberLocation(id)

  
  return (
    <div className="App">
      <h1 className='app__title'>Rick and Morthy</h1>

      <form className='form' onSubmit={handleSubmit}>
        <input className='form__input'
         id='inputLocation'
          type="text"
          onChange={handleChange}
          //onFocus= {handleFocus}
          //onBlur= {handleBlur}
          />
        <button className='form__btn'>search</button>
      </form>
      {
        isShow &&
      <ul className='form__suggestions'>
          {
           listLocation?.map(loc => (
            <li onClick= {() => handleClickList (loc.id)} key={loc.id}>{loc.name}</li>
           ))
          }
        </ul>
}
{
      hasError ? 

        <h2>Hey! you must provide an id from 1 to 126</h2>
      :
      <>
        <LocationInfo location={location}/>
        
        <div className='residents__container'>

          {
            location?.residents.map(url => (
              <ResidentInfo 
                key={url}
                url={url}
              />
            ))
          }

        </div>
      </>
}
    </div>
  )
}

export default App
