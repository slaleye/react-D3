import React, { useRef, useEffect} from 'react';
import {select, min, max, scaleTime, scaleLinear, axisBottom} from 'd3';

import useResizeObserver from './useResizeObserver';



const getDate = dateString => {
    const date = dateString.split("-");
    return new Date(date[2], date[0] -1, date[1]);
}

function BarChart({ data, highlight }) {

    const svgRef = useRef();
    const svgWrapperRef= useRef();
    const dimensions = useResizeObserver(svgWrapperRef);
  
  
    useEffect( () => {

      const svg = select(svgRef.current);
     if(!dimensions) return;

    const minDate = min(data, episode => getDate(episode.air_date));
    const maxDate = max(data, episode => getDate(episode.air_date));

    //console.log(maxDate);


    // XScale to map date to pixel values
    // maps 0 to minDate and the width of the svg value to the highest Date in the range 
     const xScale = scaleTime()
        .domain([minDate,maxDate])
        .range([10, dimensions.width-10]);

    const xAxis = axisBottom(xScale);
    

    svg.select(".x-axis")
        .style("transform",`translateY(${dimensions.height-30}px)`)
        .call(xAxis);

    const yScale = scaleLinear()
        .domain([max(data, episode => episode.characters.length),0])
        .range([0, dimensions.height]);
    

    svg.selectAll('.episode')
        .data(data)
        .join("line")
            .attr("class","episode")
            .attr("stroke",episode => episode.characters.includes(highlight) ? "orange" : "green" )
            .attr("x1", episode => xScale(getDate(episode.air_date)))
            .attr("y1", dimensions.height-30)
            .attr("x2", episode => xScale(getDate(episode.air_date)))
            .attr("y2",  episode => yScale((episode.characters.length)));

    },[data, dimensions, highlight]);
  
    return (
    
        <div ref={svgWrapperRef}>
            <svg ref={svgRef}>
                <g className="x-axis"/>
                <g className="y-axis"/>
            </svg>
            <br/>
        </div>);
  }
  
  export default BarChart;