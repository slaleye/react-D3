import React, { useRef, useEffect, useState} from 'react';
import {select, line, curveCardinal} from 'd3';
import './App.css';



function App() {
  const totalSvgHeight = 150;
  const initialData = [34,10,20,60,20,40,10];
  const [dataSet, setData] = useState(initialData);

  const svgRef = useRef();

  useEffect( () => {
    console.log(svgRef);
    const svg = select(svgRef.current);
    // line generates the d element of the path based on the daa it gets
    const myLine = line().x((value, index) => index * 50)
                    .y(value => totalSvgHeight-value)
                    .curve(curveCardinal); // Started from the bottom now we here XD, make chart start
                    //from the bottom by removing them from the total height of the svg
                    // curve on line function to make the graph a curve using curveCardinal
    // use an array in selectAll().ddata, so D3 generates only one path element with the data inside our dataSet
    svg.selectAll('path').data([dataSet]).join('path')
        .attr('d', value => myLine(value))
        .attr('fill','none')
        .attr('stroke','orange');

  },[dataSet]);

  return (<React.Fragment>
        <h2>Line Chart</h2>
        <svg ref={svgRef}>
        </svg>
        <br/>
        <button onClick={ () => setData(dataSet.map( value => value+ 5))} >Update + 5</button>
        <span>&nbsp;</span>
  <button onClick={() => setData(dataSet.filter(value => value < 35))}>Filter {"<"} 35</button>
        <span>&nbsp;</span>
        <button onClick={() => setData(initialData.map(value => value ))}>Reset </button>
      </React.Fragment>);
}

export default App;
