import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GanttChart = ({ startDate, endDate, status, taskName }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!startDate || !endDate) return;

    // Clear previous SVG
    d3.select(svgRef.current).selectAll("*").remove();
    d3.select(tooltipRef.current).selectAll("*").remove();

    const width = 300;
    const height = 30;
    const margin = { top: 5, right: 5, bottom: 5, left: 5 };

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible");

    // Tooltip setup
    const tooltip = d3.select(tooltipRef.current)
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "white")
      .style("border", "1px solid #ddd")
      .style("border-radius", "4px")
      .style("padding", "8px")
      .style("font-size", "12px")
      .style("box-shadow", "0 2px 4px rgba(0,0,0,0.2)");

    // Parse dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = (end - start) / (1000 * 60 * 60 * 24); // in days

    // Calculate min/max dates for the full timeline (with some padding)
    const minDate = new Date(start);
    minDate.setDate(minDate.getDate() - 2);
    const maxDate = new Date(end);
    maxDate.setDate(maxDate.getDate() + 2);

    // Create scales
    const xScale = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([margin.left, width - margin.right]);

    // Color based on status
    const getColor = () => {
      switch (status) {
        case "Active": return "#4CAF50"; // Green
        case "In Progress": return "#FFC107"; // Amber
        case "Completed": return "#F44336"; // Red
        default: return "#2196F3"; // Blue
      }
    };

    // Draw the timeline background
    svg.append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom)
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("fill", "#f5f5f5");

    // Draw the progress bar
    const bar = svg.append("rect")
      .attr("x", xScale(start))
      .attr("y", margin.top + 2)
      .attr("width", xScale(end) - xScale(start))
      .attr("height", height - margin.top - margin.bottom - 4)
      .attr("rx", 3)
      .attr("ry", 3)
      .attr("fill", getColor())
      .style("cursor", "ew-resize")
      .style("transition", "all 0.3s ease");

    // Add drag behavior for resizing
    const drag = d3.drag()
      .on("drag", function(event) {
        const newX = Math.max(margin.left, Math.min(width - margin.right, event.x));
        
        if (Math.abs(newX - xScale(start)) < Math.abs(newX - xScale(end))) {
          // Dragging the left edge
          const newStartDate = xScale.invert(newX);
          bar.attr("x", newX)
             .attr("width", xScale(end) - newX);
          
          // Update tooltip with new dates
          tooltip.html(`
            <div><strong>${taskName}</strong></div>
            <div>Start: ${newStartDate.toDateString()}</div>
            <div>End: ${end.toDateString()}</div>
            <div>Duration: ${Math.round((end - newStartDate) / (1000 * 60 * 60 * 24))} days</div>
          `);
        } else {
          // Dragging the right edge
          const newEndDate = xScale.invert(newX);
          bar.attr("width", newX - xScale(start));
          
          // Update tooltip with new dates
          tooltip.html(`
            <div><strong>${taskName}</strong></div>
            <div>Start: ${start.toDateString()}</div>
            <div>End: ${newEndDate.toDateString()}</div>
            <div>Duration: ${Math.round((newEndDate - start) / (1000 * 60 * 60 * 24))} days</div>
          `);
        }
      });

    bar.call(drag);

    // Add hover effects
    bar.on("mouseover", function() {
        tooltip.html(`
          <div><strong>${taskName}</strong></div>
          <div>Start: ${start.toDateString()}</div>
          <div>End: ${end.toDateString()}</div>
          <div>Duration: ${duration} days</div>
          <div>Status: ${status}</div>
        `);
        tooltip.style("visibility", "visible");
      })
      .on("mousemove", function(event) {
        tooltip.style("top", `${event.pageY - 10}px`)
               .style("left", `${event.pageX + 10}px`);
      })
      .on("mouseout", function() {
        tooltip.style("visibility", "hidden");
      });

    // Add subtle gradient for depth
    bar.attr("fill", `url(#gradient-${status})`);

    // Add gradient definition
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
      .attr("id", `gradient-${status}`)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", d3.color(getColor()).brighter(0.2));

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", d3.color(getColor()).darker(0.2));

    // Add subtle shadow for depth
    bar.style("filter", "url(#drop-shadow)");

    defs.append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%")
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 1)
      .attr("result", "blur");

    defs.select("filter")
      .append("feOffset")
      .attr("in", "blur")
      .attr("dx", 0)
      .attr("dy", 1)
      .attr("result", "offsetBlur");

    const feMerge = defs.select("filter")
      .append("feMerge");

    feMerge.append("feMergeNode")
      .attr("in", "offsetBlur");
    feMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");

  }, [startDate, endDate, status, taskName]);

  return (
    <div style={{ position: 'relative' }}>
      <svg ref={svgRef}></svg>
      <div ref={tooltipRef}></div>
    </div>
  );
};

export default GanttChart;