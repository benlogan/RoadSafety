// http://bl.ocks.org/NPashaP/59c2c7483fb61070486835d15c807941
function drawGaugeChart() {            
    var svg = d3.select("#svg_gauge");
    var g = svg.append("g").attr("transform","translate(400,300)"); // move to center, so half of svg size

    var speedMap = new Map();
    speedMap.set(10, '2 (.001%)');
    speedMap.set(20, '4290 (3%)');
    speedMap.set(30, '89627 (64%)');
    speedMap.set(40, '11804 (8.5%)');
    speedMap.set(50, '5625 (4%)');
    speedMap.set(60, '19081 (13.6%)');
    speedMap.set(70, '9626 (6.9%)');
    
    var gg = viz.gg()
        //.domain(domain) // what was this doing?
        .outerRadius(300)
        .innerRadius(30)
        .value(0) // starting value
        .duration(1000);
    
    gg.defs(svg);
    g.call(gg);  

    d3.select(self.frameElement).style("height", "700px");
    var speed = 0;
    setInterval( function(){
        if(speed == 70) {
            speed = 0;
        }
        speed+=10;
        d3.select("#speedLabel").text(speedMap.get(speed));
        gg.setNeedle(speed);
    },2000);
}