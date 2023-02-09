import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './styles/residentInfo.css'

const ResidentInfo = ({url}) => {

    const [chracter, setchracter] = useState()

    useEffect(() => {
      
        axios.get(url)

        .then(res => setchracter(res.data))
        .catch(err => console.log(err))

    }, [])
    
console.log(chracter)
  return (
    <article className='resident'>
        <header className='resident__header'>
            <img className='resident__img' src={chracter?.image} alt="" />
            <div className='resident__container_status'>
                <span className={`resident__circle ${chracter?.status}`}></span>
                <span className='resident__status'>{chracter?.status}</span>
            </div>
        </header>
        <section className='resident__body'>
            <h3 className='resident__name'>{chracter?.name}</h3>
            <ul className='resident__list'>
                <li className='resident__item'><span className='resident__label'>Specie: </span>{chracter?.species}</li>  
                <li className='resident__item'><span className='resident__label'>Origin: </span> {chracter?.origin.name}</li>
                <li className='resident__item'><span className='resident__label'>Epissodes where appear: </span>{chracter?.episode.length}</li>
            </ul>
        </section>
    </article>
  )
}

export default ResidentInfo