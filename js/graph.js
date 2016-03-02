var Graph = function(location, graph) { // maybe later not pass for initialization, only use the prototype to update, also for hte first timestamp! ;)
  var that = this;

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
  this.force = d3.layout.force()
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

this.force.linkDistance(function(link) {
   return (1 - link.weight) * 4000; // try also exponential
 });

this.svg = d3.select(location).append("svg")
.style("width","100%")
.style("height","100%")
//.attr("viewBox", "0 0 800 400")
.attr("viewBox", this.svgR+" "+this.svgT+" "+this.svgW+" "+this.svgH);

this.force
.nodes(graph.nodes)
.links(graph.links)
.start();

this.link = this.svg.selectAll(".link")
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
.call(this.force.drag);

node.append("title")
.text(function(d) { return d.name; });

this.force.on("tick", function() {
  that.link.attr("x1", function(d) { return d.source.x; })
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

Graph.prototype.change = function(newData) {
  //console.log('test');
  console.log(newData);

  console.log(this.link);

  for(i = 0; i < 120; i++) {
    console.log(this.link[0][i].__data__.value);
    console.log(newData.links[i].value);
    this.link[0][i].__data__.weight = newData.links[i].weight;
  }

  //this.force.linkDistance(100);

  /*
  console.log(newData.links);

  this.force
  .nodes(newData.nodes)
  .links(newData.links)
  .start();


  this.svg.selectAll(".link")
  .data(newData.links)
  .enter().append("line")
  .attr("class", "link")
  .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  /*
  this.svg.selectAll(".node")
  .data(newData.nodes)
  .enter().append("circle")
  .attr("class", "node")
  .attr("r", 5)
  .style("fill", function(d) { return color(d.group); })
  .call(this.force.drag);


  this.svg.selectAll(".node").append("title")
  .text(function(d) { return d.name; });
  */

/*
  this.force.linkDistance(function(d) {
   return d.value; // try also exponential
 });*/

this.force.start();

/*
this.force.linkDistance(function(d) {
   return d.value*10; // try also exponential
 });*/
  /*var circle = this.svg.selectAll("circle")
  .data(newData);

  circle.enter().append("circle")
  .attr("r", 2.5);

  circle
  .attr("cx", function(d) { return d.x; })
  .attr("cy", function(d) { return d.y; });

  circle.exit().remove();*/
};
