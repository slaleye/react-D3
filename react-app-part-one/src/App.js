import React, { useState, useEffect} from 'react';
import BarChart from "./Barchart";
import './App.css';

const CHARACTERS_API_LINK ="https://breakingbadapi.com/api/characters?category=Breaking+Bad&limit=20";
const EPISODE_API_LINK ="https://breakingbadapi.com/api/episodes?series=Breaking+Bad&limit=50";

function App() {


  const [episodes, setEpisodes] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [highlight, setHighlight] = useState([]);

  useEffect( () => {
    fetch(CHARACTERS_API_LINK)
      .then(response => response.ok && response.json())
      .then(data => {
     //   console.log(data);
          setCharacters(data); 
      })
      .catch(console.error);

  }, []);

  useEffect( () => {
    fetch(EPISODE_API_LINK)
    .then(response => response.ok && response.json())
    .then(data => {
      //  console.log(data);
        setEpisodes(data); 
    })
    .catch(console.error);
    
  }, []);

 
  return (<React.Fragment>
        <h2> Part 08: Breaking Bad Timeline</h2>
        <BarChart highlight={highlight} data={episodes}/>
           <h3>Select A Character</h3>
           <select value={highlight} onChange={e => setHighlight(e.target.value)}>
             <option>Pick a Character</option>
             {characters.map(character => (
                  <option key={character.name}>{character.name}</option>
             ))}
           </select>
            

      </React.Fragment>);
}

export default App;
