function drawPieChart() {            
    var svgPie = d3.select("#svg_pie"),
    width = +svgPie.attr("width"),
    height = +svgPie.attr("height"),
    radius = Math.min(width, height) / 2,
    graphPie = svgPie.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d.frequency; });

    var path = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var label = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var dataPie = [
        {gender: "Male", frequency: 169251},
        {gender: "Female", frequency: 72046}
    ]

    var arc = graphPie.selectAll(".arc")
        .data(pie(dataPie))
        .enter().append("g")
        .attr("class", "arc");

    arc.append("path")
        .attr("d", path)
        .attr("fill", function(d) { return color(dataPie.gender); });

    arc.append("text")
        .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
        .attr("dy", "0.35em")
        .text(function(d) { return dataPie.gender; });
}