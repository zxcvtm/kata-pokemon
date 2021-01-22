import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

const list = [
    {name: 'pikachu', url: 'x'},
    {name: 'charmander', url: 'x'},
    {name: 'ditto', url: 'x'},
    {name: 'cubone', url: 'x'},
]

const App = () => {

  const [pokemonList, setPokemonList] = useState(list)
  const [isFirstRender, setIsFisrtRender] = useState(true)
  useEffect(() => {
    if (isFirstRender) {
      setIsFisrtRender(false)
      axios.get('https://pokeapi.co/api/v2/pokemon?limit=100&offset=200')
        .then(parsePokemon)
        .catch(error => console.log('error: ', error))
    }
  })

  const parsePokemon = data => {
    console.log('mostrando data: ',data)
    const tempList = [...pokemonList, ...data.data.results]
    setPokemonList(tempList)
  }

  
  

  const addPokemon = () => {
    console.log('add pokemon is called')
    setPokemonList([...pokemonList, {name: 'arbok', url: 'x'}])
  }

  return (
    <div style={{margin: '1rem'}}>
      <h1>Kata Pokemon</h1>
      {pokemonList.map((pokemon, index) => (
        <div key={index} style={{margin: '1rem 0', border: '1px solid black', padding: '1rem'}}>
          <span>{pokemon.name}</span>
        </div>
      ))}
      <button onClick={addPokemon}>Agregar Pokemon</button>
    </div>
  );
}

export default App;
