function drawBarChart() {            
    var svgBar = d3.select("#svg_bar"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svgBar.attr("width") - margin.left - margin.right,
    height = +svgBar.attr("height") - margin.top - margin.bottom;

    var x2 = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y2 = d3.scaleLinear().rangeRound([height, 0]);

    var graph = svgBar.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("data/AccidentCountByAge.csv", function(d) {
        d.frequency = +d.Number_of_Accidents;
        return d;
    }, function(error, data) {
        if (error) throw error;

        x2.domain(data.map(function(d) { return d.Age_of_Driver; }));
        y2.domain([0, d3.max(data, function(d) { return d.frequency; })]);

        graph.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x2).tickValues([10,17,20,30,40,50,60,70,80,90]));

        graph.append("g")
          .attr("class", "axis axis--y")
            .call(d3.axisLeft(y2))
        .append("text")
          .attr("fill", "#000")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Number of Accidents");

        graph.selectAll(".bar")
        .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x2(d.Age_of_Driver); })
          .attr("y", function(d) { return y2(d.frequency); })
          .attr("width", x2.bandwidth())
          .attr("height", function(d) { return height - y2(d.frequency); });
    });
}