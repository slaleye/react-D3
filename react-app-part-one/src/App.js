import React, { useRef, useEffect, useState} from 'react';
import {select} from 'd3';
import './App.css';



function App() {
   const[data, setData] = useState([10,20,30,40,50]);
    //useRef : hook used to access Dom element
  const svgRef = useRef();
  // useEffect will be called once the Dom element has been rendered, and also when element in the array passed to it has been changed
  useEffect( () => {
    console.log(svgRef);
    const svg = select(svgRef.current);
    svg.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("r", value => value) // join will handle entering and updating elements
        .attr("cx", value => value*2 )
        .attr("cy", value => value*2 )
        .attr("stroke", 'blue');
  },[data]);

  return (<React.Fragment>
        <svg ref={svgRef}></svg>
        <br/>
        <button onClick={ () => setData(data.map( value => value+ 5))} >Update Data</button>
        <button onClick={() => setData(data.filter(value => value < 35))}>Filter Data</button>
      </React.Fragment>);
}

export default App;
