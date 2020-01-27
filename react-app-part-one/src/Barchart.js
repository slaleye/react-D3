import React, { useRef, useEffect, useState} from 'react';
import {select, min, max} from 'd3';

import useResizeObserver from './useResizeObserver';



const getDate = dateString => {
    const date = dateString.split("-");
    return new Date(date[2], date[0] -1, date[1]);
}

function BarChart({ data }) {

    const svgRef = useRef();
    const svgWrapperRef= useRef();
    const dimensions = useResizeObserver(svgWrapperRef);
  
  
    useEffect( () => {

      const svg = select(svgRef.current);
     if(!dimensions) return;

    const minDate = min(data, episode => getDate(episode.air_date));
    const maxDate = min(data, episode => getDate(episode.air_date));

    
    },[data, dimensions]);
  
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