var Graph = function(location, graph) { // maybe later not pass for initialization, only use the prototype to update, also for hte first timestamp! ;)

  console.log(graph);

  this.svgW = 1500;
  this.svgH = 1000;
  this.svgR = 0;
  this.svgT = 0;

  var color = d3.scale.category20();

  // Standard
  /*var force = d3.layout.force()
  .charge(-120)
  //.linkDistance(100)
  .size([width, height]);*/

  /* Mine not bad
  var force = d3.layout.force()
  .charge(0)
  //.linkDistance(100)
  .gravity(15)
  .linkStrength(1)
  .size([width, height]); */

  // Mine tries
  var force = d3.layout.force()
  .charge(-1)
  //.linkDistance(100)
  .gravity(0)
  .linkStrength(0.1)
  .size([this.svgW, this.svgH]);

  // Zero Gravity
  /*var force = d3.layout.force()
  .charge(-800)
  .friction(0.45)
  .linkStrength(1)
  .gravity(0);*/

  /*force.linkDistance(function(link) {
   return (1 - link.weight) * 3000; // try also exponential
 });*/

force.linkDistance(function(link) {
   return (1 - link.weight) * 4000; // try also exponential
 });

this.svg = d3.select(location).append("svg")
.style("width","100%")
.style("height","100%")
//.attr("viewBox", "0 0 800 400")
.attr("viewBox", this.svgR+" "+this.svgT+" "+this.svgW+" "+this.svgH);

force
.nodes(graph.nodes)
.links(graph.links)
.start();

var link = this.svg.selectAll(".link")
.data(graph.links)
.enter().append("line")
.attr("class", "link")
.style("stroke-width", function(d) { return Math.sqrt(d.value); });

var node = this.svg.selectAll(".node")
.data(graph.nodes)
.enter().append("circle")
.attr("class", "node")
.attr("r", 5)
.style("fill", function(d) { return color(d.community); })
.call(force.drag);

node.append("title")
.text(function(d) { return d.name; });

force.on("tick", function() {
  link.attr("x1", function(d) { return d.source.x; })
  .attr("y1", function(d) { return d.source.y; })
  .attr("x2", function(d) { return d.target.x; })
  .attr("y2", function(d) { return d.target.y; });

    /*node.attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });*/

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });

};

Graph.prototype.resizeForceGraph =  function (amount) {
  console.log('innnn');
  this.svgR = this.svgR - amount/4;
  this.svgT = this.svgT - amount/4;
  this.svgW = this.svgW + amount;
  this.svgH = this.svgH + amount;
  this.svg.attr("viewBox", this.svgR+" "+this.svgT+" "+this.svgW+" "+this.svgH);
};
