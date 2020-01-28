import React, { useState, useEffect} from 'react';
import BarChart from "./Barchart";
import './App.css';

const CHARACTERS_API_LINK ="https://breakingbadapi.com/api/characters?category=Breaking+Bad&limit=100&offset=23";
const EPISODE_API_LINK ="https://breakingbadapi.com/api/episodes?series=Breaking+Bad&limit=100";
const CHARACTER_BY_NAME_API_LINK ="https://breakingbadapi.com/api/characters?name=";



function App() {

  function ProfileInfo (data){
    console.log(data);
    
    if(characterData.name){
      return (
        <div className="profile-image-container">
          <img alt="Character" title={characterData.name} className="profile-image" src={characterData.img}></img>
            <div className="profile-info">
              <strong>Name:</strong>   <span>{characterData.name}</span><br></br>
              <strong>Nickname:</strong> <span>{characterData.nickname}</span>
            </div>
        </div>

      );
    }else{
      return null;
    }
  
  }

  const [episodes, setEpisodes] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [highlight, setHighlight] = useState([]);
  const [characterData, setCharacterData] = useState([]);

  useEffect( () => {
    fetch(CHARACTERS_API_LINK)
      .then(response => response.ok && response.json())
      .then(data => {
          setCharacters(data); 
      })
      .catch(console.error);

  }, []);

  useEffect( () => {
    fetch(EPISODE_API_LINK)
    .then(response => response.ok && response.json())
    .then(data => {
        setEpisodes(data); 
    })
    .catch(console.error);
    
  }, []);

  const getCharacterByName = (name) =>{
    fetch(CHARACTER_BY_NAME_API_LINK+name)
    .then(response => response.ok && response.json())
    .then(data => {
      setCharacterData(data[0]); 
    })
    .catch(console.error);

  }

  const characterOnChangeEvent = (e) => {
      setHighlight(e.target.value);
      getCharacterByName(e.target.value);
  };
 
  return (<React.Fragment>
        <h2> Part 08: Breaking Bad Timeline</h2>
        <ProfileInfo data={characterData} />
        <BarChart highlight={highlight} data={episodes}/>
           <select value={highlight} onChange={characterOnChangeEvent}>
             <option>Pick a Character</option>
             {characters.map(character => (
                  <option key={character.name} >{character.name}</option>
             ))}
           </select>
            

      </React.Fragment>);
}

export default App;
