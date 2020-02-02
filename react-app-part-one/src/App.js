import React, { useState } from 'react';
import RacingBarChart from "./RacingBarchart";
import useInterval from "./useInterval";
import './App.css';


const getRandomIndex = array => { return Math.floor(array.length * Math.random())};

function App() {

  const [iteration, setIteration] = useState(0);
  const [start, setStart] = useState(false);
  const [dataset, setDataset] = useState([
    {
      name:'JavaScript',
      value: 10,
      color: "yellow"
    },
    {
      name:'React JS',
      value: 50,
      color: "lightblue"
    },
    {
      name:'Vue JS',
      value: 80,
      color: "green"
    },
    {
      name:'Mongo DB',
      value: 30,
      color: "lightgreen"
    },
    {
      name:'Angular',
      value: 80,
      color: "red"
    }
  ]);
 
  useInterval(() => {
    if(start){
        const randomIndex = getRandomIndex(dataset);
        setDataset(
          dataset.map((entry , index) => {
            if(index === randomIndex){
              return { ...entry, value: entry.value +10}
            }else{
              return entry;
            }
          })
        );
        setIteration(iteration + 1);
    }
  }, 500);

  return (<React.Fragment>
        <h2> Part 09: Racing Bar Chart</h2>
        <RacingBarChart data={dataset} />
        <button onClick={ () => setStart(!start)}>
          { start ? "Stop the Race" : "Start the Race"}
        </button>
        <p># Iteration :{iteration}</p>
       
  

      </React.Fragment>);
}

export default App;
