import React, { useRef, useEffect, useState} from 'react';
import {select, line, curveCardinal, axisBottom, axisRight, scaleLinear} from 'd3';
import './App.css';



function App() {

  const svgHeight = 200;
  const svgWidth = 400;
  const paddingLeft = 10;
  const paddingRight = 30;
  const paddingBottom = 20;
  const initialData = [35,5,15,60,20,40,10,75,60,32];

  const [dataSet, setData] = useState(initialData);

  const svgRef = useRef();

  // Called initially and every data chage 
  useEffect( () => {
    console.log(svgRef);
    const svg = select(svgRef.current);
       const xScale = scaleLinear()
      .domain([0, initialData.length-1])
      .range([paddingLeft, svgWidth-paddingRight]);

    const maxValue = Math.max(...initialData);
      console.log(maxValue);
     const highestYValue = svgHeight - maxValue+paddingBottom
      const yScale = scaleLinear()
                    .domain([0,highestYValue])
                    .range([svgHeight-paddingBottom, 0]);  

    // Axis Bottom: simply places the ticks at the bottom, but does not automatically place the axes at the bottom              
    const xAxis = axisBottom(xScale)
                  .ticks(dataSet.length)
                  .tickFormat(index => index+1); // Expects a scale

 // Equivalent to xAxis(svg.select(".x-axis"))
    svg.select(".x-axis")
        .style('transform',` translateY(${svgHeight-paddingBottom}px)` )
        .call(xAxis);
 
   // Add Right Axis
   const yAxis = axisRight(yScale);
   svg.select(".y-axis")
            .style('transform',` translateX(${svgWidth-paddingRight}px)` )
            .call(yAxis);


    // Generates "d" element for "path" element 
    const myLine = line().x((value, index) =>xScale(index))
                    .y(yScale) // equivalent to value => yScale(value)
                    .curve(curveCardinal);
                    
    svg.selectAll('.line') //When xaxis bottom added the graph rendered at the bottom use 'line'
        .data([dataSet])
        .join('path')
        .attr('class','line')
        .attr('d', myLine ) // equivalent tovalue => myLine(value)
        .attr('fill','none')
        .attr('stroke','orange');

  },[dataSet,initialData]);

  return (<React.Fragment>
        <h2>Curved Line Chart: X and Y Axis</h2>
        <svg width={svgWidth} height={svgHeight} ref={svgRef}>
          <g className="x-axis"/>
          <g className="y-axis"/>
        </svg>
        <br/>
        <div className="button-container">
            <button onClick={ () => setData(dataSet.map( value => value+ 5))} >Update + 5</button>
            <span>&nbsp;</span>
            <button onClick={() => setData(dataSet.filter(value => value > 30))}>Filter {">"} 30</button>
            <span>&nbsp;</span>
            <button onClick={() => setData(dataSet.filter(value => value < 30))}>Filter {"<"} 30</button>
            <span>&nbsp;</span>
            <button onClick={() => setData(initialData.map(value => value ))}>Reset </button>
        </div>
      </React.Fragment>);
}

export default App;
