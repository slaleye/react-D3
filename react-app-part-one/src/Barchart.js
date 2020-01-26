import React, { useRef, useEffect, useState} from 'react';
import {select,  axisBottom, axisRight, scaleLinear, scaleBand} from 'd3';
import ResizeObserver from 'resize-observer-polyfill';

// Custom Hook observe dom element and return size

const useResizeObserver = (ref) => {
    const [dimensions, setDimensions] = useState(null);

    useEffect(() => {
        const ObserveTarget = ref.current;
        const resizeObserver = new ResizeObserver((entries)=>{ 
            entries.forEach(element => {
                setDimensions(element.contentRect);
            });         
        });
        resizeObserver.observe(ObserveTarget);
        return () => {
            resizeObserver.unobserve(ObserveTarget);
        }
    },[ref]);

    return dimensions;
}

function BarChart({ data }) {

    const svgRef = useRef();
    const svgWrapperRef= useRef();
    const dimensions = useResizeObserver(svgWrapperRef);

    const svgHeight = 200;

    const paddingLeft = 10;
    const paddingRight = 30;
    const paddingBottom = 20;

    

  
  
  
    useEffect( () => {

      const svg = select(svgRef.current);
     if(!dimensions) return;
     const svgWidth = dimensions.width;
     const maxValue = Math.max(...data.initialData);
     const highestYValue = svgHeight - maxValue+paddingBottom;
      const xScale = scaleBand()
        .domain(data.dataSet.map((element, index) => index))
        .range([paddingLeft, svgWidth-paddingRight])
        .padding(0.5);
      
   
      const colorScale = scaleLinear()
                      .domain([30,~~(highestYValue/2),highestYValue])
                      .range(["#C5EDAC","#F7A278","orange"])
                      .clamp(true);
  
  
      const yScale = scaleLinear()
                      .domain([0,highestYValue]) // TODO
                      .range([svgHeight-paddingBottom, 0]);   //Change
  
     
      const xAxis = axisBottom(xScale).ticks(data.dataSet.length);
      svg.select(".x-axis")
          .style('transform',` translateY(${svgHeight-paddingBottom}px)` )
          .call(xAxis);
  
     const yAxis = axisRight(yScale);
     svg.select(".y-axis")
              .style('transform',` translateX(${svgWidth-paddingRight}px)` )
              .call(yAxis);
  
    // Draw Bar
    svg.selectAll(".bar")
        .data(data.dataSet)
          .join('rect')
            .attr('class','bar')
            .attr('transform','scale(1, -1)')//flip the bar upside down to fix wron animation start
            .attr('x', (value,index) => xScale(index))
            .attr('y', -svgHeight+paddingBottom)
            .attr('width', xScale.bandwidth()) // bandwidth equals to the width of one band
            .on("mouseenter", (value, index) => {
               console.log(value);
               svg.selectAll(".tooltip")
                  .data([value]) // Sync with one data element
                  .join( enter => enter.append("text").attr("y", yScale(value))) // .join("text") Creates a new text element, Adds animation by fixing Yscale of element entering
                    .attr("class","tooltip") 
                    .text(value) // Updates value of text element with current value of rect being hovered
                    .attr("x",xScale(index) + xScale.bandwidth()/2) // display element on x scale, using index of the current element array
                    .attr("text-anchor",'middle') // To center the tooltip in the center add  + xScale.bandwidth()/2
                    .transition()
                      .attr("y",yScale(value)-paddingLeft) // tooltip position on y axis
                      .attr("opacity",1)
                  ;
              })
            .on("mouseleave", () => svg.select(".tooltip").remove())  
            .transition()//transition will animate attribute called after it
            .attr('fill',colorScale)  
            .attr('height',value => svgHeight - yScale(value) - paddingBottom);  
  
    },[data.dataSet, data.initialData, dimensions]);
  
    return (
    
        <div ref={svgWrapperRef}>
            <svg  height={svgHeight} ref={svgRef}>
                <g className="x-axis"/>
                <g className="y-axis"/>
            </svg>
            <br/>
        </div>);
  }
  
  export default BarChart;