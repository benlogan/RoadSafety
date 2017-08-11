// https://bl.ocks.org/denjn5/e1cdbbe586ac31747b4a304f8f86efa5
function drawSunburstChart() {            
    var width = 960,
    height = 700,
    radius = Math.min(width, height) / 2,
    color = d3.scaleOrdinal(d3.schemeCategory20c);

    // JSON data
    var nodeData = {
        "name": "TOPICS", "children": [{
            "name": "12-3",
            //"children": [{"name": "Sub A1", "size": 4}, {"name": "Sub A2", "size": 4}]
            "children": "2"
        }, {
            "name": "3-6",
            //"children": [{"name": "Sub B1", "size": 4}, {"name": "Sub B2", "size": 4}]
            "children": "4"
        }, {
            "name": "6-9",
            //"children": [{"name": "Sub A1", "size": 4}, {"name": "Sub A2", "size": 4}]
            "children": "3"
        }, {
            "name": "9-12",
            //"children": [{"name": "Sub A1", "size": 4}, {"name": "Sub A2", "size": 4}]
            "children": "1"
        }]
    };
    
    // create primary element
    var g = d3.select("#svg_sun")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // data structure
    var partition = d3.partition()
        .size([2 * Math.PI, radius]);

    // find data root
    var root = d3.hierarchy(nodeData)
        //.sum(function (d) { return d.size});
        .sum(function (d) { return d.children});
    
    // size arcs
    partition(root);
    var arc = d3.arc()
        .startAngle(function(d) { return d.x0; })
        .endAngle(function(d) { return d.x1; })
        .innerRadius(function(d) { return d.y0; })
        .outerRadius(function(d) { return d.y1; });

    // Put it all together
    g.selectAll('path')
        .data(root.descendants())
        .enter().append('path')
        .attr("display", function (d) { return d.depth ? null : "none"; })
        .attr("d", arc)
        .style('stroke', '#fff')
        .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); });

}