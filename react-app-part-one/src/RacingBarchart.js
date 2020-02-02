import React, { useRef, useEffect} from 'react';
import {select, min, max, scaleTime, scaleLinear, axisBottom} from 'd3';

import useResizeObserver from './useResizeObserver';




function BarChart({ data, highlight }) {

    const svgRef = useRef();
    const svgWrapperRef= useRef();
    const dimensions = useResizeObserver(svgWrapperRef);
  
  
    useEffect( () => {

    const svg = select(svgRef.current);
     if(!dimensions) return;

   
    },[data, dimensions, highlight]);
  
    return (
    
        <div ref={svgWrapperRef}>
            <svg ref={svgRef}>
            </svg>
            <br/>
        </div>);
  }
  
  export default BarChart;