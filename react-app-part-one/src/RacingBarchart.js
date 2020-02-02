import React, { useRef, useEffect} from 'react';
import {select, scaleBand, scaleLinear, max} from 'd3';

import useResizeObserver from './useResizeObserver';




function BarChart({ data }) {

    const svgRef = useRef();
    const svgWrapperRef= useRef();
    const dimensions = useResizeObserver(svgWrapperRef);
  
  
    useEffect( () => {

    const svg = select(svgRef.current);
     if(!dimensions) return;
    
     // Sort the data
     data.sort((a,b) => b.value - a.value);

     // #1 Create Y scale of type ScaleBand

     const yScale = scaleBand()
        .domain(data.map((value,index)=> index)) // [0,1,2,3,4]
        .range([0, dimensions.height]) // [0,200]
        .paddingInner(0.1);

    // # 2 Create X Scale of type ScaleLinear

    const xScale= scaleLinear().domain([0, max(data, entry => entry.value )])
    .range([0, dimensions.width]);

    // # 3 Draw bars
    svg.selectAll("svg")
        .data(data, (entry, index) => entry.name) // returns entry name to make d3 change order of element and not just index as default
        .join(enter => enter.append("rect").attr('y', (entry, index) => yScale(index)))// Sets initial Y attributes of elements on enter
            .attr('class', 'bar')
            .attr('x',0)
            .transition()
            .attr('width', entry => xScale(entry.value))
            .attr('y', (entry, index) => yScale(index))
            .attr('height', yScale.bandwidth())
            .attr('fill', entry => entry.color);

    // # 4 Draw Labels
    svg.selectAll(".label")
        .data(data, (entry, index) => entry.name) // returns entry name to make d3 change order of element and not just index as default
        .join( enter => enter.append("text").attr('y', (entry, index) => yScale(index) + yScale.bandwidth() / 2)) // Sets initial Y attributes of elements on enter
            .text(entry => `${entry.name} (${entry.value})`)
            .attr('class','label')
            .attr('x',10)
            .transition()
            .attr('y', (entry, index) => yScale(index) + yScale.bandwidth() / 2 +5)

    },[data, dimensions]);
  
    return (
    
        <div ref={svgWrapperRef}>
            <svg ref={svgRef}></svg>
        </div>);
  }
  
  export default BarChart;