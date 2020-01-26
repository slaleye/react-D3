import React, { useState} from 'react';
import BarChart from "./Barchart";
import './App.css';



function App() {

  const initialData = [35,5,15,60,20,40,10,75,60,32];
  const randomData = [...Array(10)].map(element=>~~(Math.random()*125)); //
  const [dataSet, setData] = useState(initialData);
  const data ={
    dataSet: dataSet,
    initialData :initialData,
    randomData:randomData
  }
  return (<React.Fragment>
        <h2> Part 06: Responsive Bar Chart</h2>
        <BarChart data={data}/>
        <div className="button-container">
            <button onClick={ () => setData(dataSet.map( value => value+ 5))} >Update + 5</button>
            <span>&nbsp;</span>
            <button onClick={() => setData(dataSet.filter(value => value > 30))}>Filter {">"} 30</button>
            <span>&nbsp;</span>
            <button onClick={() => setData(dataSet.filter(value => value < 30))}>Filter {"<"} 30</button>
            <span>&nbsp;</span>
            <button onClick={() => setData(randomData)}>Random </button>
            <span>&nbsp;</span>
            <button onClick={() => setData(initialData.map(value => value ))}>Reset </button>
        </div>
      </React.Fragment>);
}

export default App;
