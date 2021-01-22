import './App.css';

const App = () => {
  const list = [
    {name: 'pikachu', url: 'x'},
    {name: 'charmander', url: 'x'},
    {name: 'ditto', url: 'x'},
    {name: 'cubone', url: 'x'},
  ]
  return (
    <div style={{margin: '1rem'}}>
      <h1>Kata Pokemon</h1>
      {list.map((pokemon, index) => (
        <div key={index}>
          <span>{pokemon.name}</span>
        </div>
      ))}
    </div>
  );
}

export default App;
