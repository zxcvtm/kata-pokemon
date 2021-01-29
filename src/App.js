import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [pokemonList, setPokemonList] = useState([])
  const [isFirstRender, setIsFisrtRender] = useState(true)
  const [pokemonData, setPokemonData] = useState({})

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

  const parseDescription = ({data}) => {
    const {name, types, sprites } = data 
    setPokemonData({name, types, sprites})
  }

  const getDescription = (url) => {
    axios.get(url)
        .then(parseDescription)
        .catch(error => console.log('error: ', error))
  }

  return (
    <div style={{margin: '1rem'}}>
      <h1>Kata Pokemon</h1>
      {pokemonList.map((pokemon, index) => (
        <div key={index} style={{margin: '1rem 0', border: '1px solid black', padding: '1rem'}}>
          <button onClick={() =>getDescription(pokemon.url)}>{pokemon.name}</button>
        {pokemon.name === pokemonData.name && 
          <div>
            <p>Descripción</p>
            <p>{pokemonData.name}</p>
            <ul>{pokemonData.types && pokemonData.types.map((type, index) => (
                <li key={index}>{type.type.name}</li>
              ))}
            </ul>
            <img src={pokemonData.sprites.front_default}/>
          </div>
        }
        </div>
      ))}
      <button onClick={addPokemon}>Agregar Pokemon</button>
    </div>
  );
}

export default App;
