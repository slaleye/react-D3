import React, { useRef, useEffect} from 'react';
import {select} from 'd3';
import './App.css';

const data =[10,20,30,40,50];

function App() {
    //useRef : hook used to access Dom element
  const svgRef = useRef();
  // useEffect will be called once the Dom element has been rendered, and also when element in the array passed to it has been changed
  useEffect( () => {
    console.log(svgRef);
    const svg = select(svgRef.current);
    svg.selectAll("circle")
        .data(data)
        .join(
            onenter => onenter.append("circle").attr("class","new"),
            onupdate => onupdate.attr("class", "updated"),
            onexit => onexit.remove()
            )
    ; // D3 will create 5 elements of Circle in the svg
  },[]);

  return (
  <svg ref={svgRef}></svg>
  );
}

export default App;
