import React, { useState } from 'react'

const AnimalForm = (props) => {
  const [animal, setAnimal] = useState({
    species: ''
  })

  const handleChange = event => {
    setAnimal({
      ...animal,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log(animal)
  }

  return (
    <div className="animal-form">
      <form onSubmit={handleSubmit}>
        <input type="text" name="species" placeholder="Species" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AnimalForm
