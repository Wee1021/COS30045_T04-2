const createBarChart = (data) => {
    // SVG dimensions
    const viewW = 500;
    const viewH = Math.max(220, data.length * 28);

    // Reserve space for category and value labels
    const labelX = 170;
    const rightPadding = 50;
    const chartWidth = viewW - labelX - rightPadding;

    // Create responsive SVG
    const svg = d3.select(".responsive-svg-container")
        .append("svg")
        .attr("viewBox", `0 0 ${viewW} ${viewH}`)
        .style("display", "block")
        .style("width", "100%")
        .style("max-width", "640px")
        .style("height", "auto")
        .style("margin", "0 auto")
        .style("border", "1px solid #ccc");

    // Linear scale for the number of TV models
    const xMax = d3.max(data, d => d.count);

    const xScale = d3.scaleLinear()
        .domain([0, xMax])
        .range([0, chartWidth]);

    // Band scale for TV brands
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, viewH])
        .paddingInner(0.2)
        .paddingOuter(0.1);

    // Create one group for each brand
    const barAndLabel = svg
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d =>
            `translate(0, ${yScale(d.brand)})`
        );

    // Draw horizontal bars
    barAndLabel
        .append("rect")
        .attr("x", labelX)
        .attr("y", 0)
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "steelblue");

    // Add brand labels on the left
    barAndLabel
        .append("text")
        .text(d => d.brand)
        .attr("x", labelX - 10)
        .attr("y", yScale.bandwidth() / 2)
        .attr("text-anchor", "end")
        .attr("dominant-baseline", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "13px");

    // Add value labels on the right
    barAndLabel
        .append("text")
        .text(d => d.count)
        .attr("x", d =>
            labelX + xScale(d.count) + 8
        )
        .attr("y", yScale.bandwidth() / 2)
        .attr("dominant-baseline", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "13px");
};
