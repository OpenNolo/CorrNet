var DataVisualizer = function (id) {
  this.visid = id;

  this.timestamp = 0;
  this.nodes = [];
  this.links = [];
  //this.graphs = []; //not so much sense

  //this.temp = 1;
  this.projectionOn = false;
};


// generates nodes exploring the indices in all links
// generates links
DataVisualizer.prototype.loadDataFromJSON = function(json) {
  //console.log(json);

  for(var j in json) {
    var tsjson = json[j];
    var dict = {};
    var tsNodes = [];
    var tsLinks = [];
    var tempNode;

    for(var i in tsjson) {
      //console.log(tsjson[i].source);
      //console.log(tsjson[i].target);

      if(!dict[tsjson[i].source]) {
        tempNode = {name:tsjson[i].source};
        tsNodes.push(tempNode);
        dict[tsjson[i].source] = tempNode;
      } else {

      }
      if(!dict[tsjson[i].target]) {
        tempNode = {name:tsjson[i].target};
        tsNodes.push(tempNode);
        dict[tsjson[i].target] = tempNode;
      } else {

      }

      //console.log(dict);
      tsLinks.push({source:dict[tsjson[i].source],target:dict[tsjson[i].target],weight:tsjson[i].weight});

    }


    //console.log(tsNodes);
    //console.log(tsLinks);
    this.nodes.push(tsNodes);
    this.links.push(tsLinks);
  }

  console.log(this.nodes);
  console.log(this.links);

};

// Takes as input a file with the communities in each timestamp and assign them to the nodes
DataVisualizer.prototype.loadCommunitiesFromJSON = function(json) {
  // TODO (is correct)
  for(var ts in json) {
    this.loadTSCommunitiesFromJSON(json[ts], ts);
  }

  // For test
  //this.loadTSCommunitiesFromJSON(json[30], 30);

  console.log(this.nodes);
};

// Takes as input a file with the communities in a timestamp and assign them to the nodes of that ts
DataVisualizer.prototype.loadTSCommunitiesFromJSON = function(json, ts) {
  console.log(json);
  //console.log(this.getNodeByName(json[2].name, ts));

  for(var j in json) {
    this.getNodeByName(json[j].name, ts).community = json[j].community;
  }

};

// Takes as input a file with coordinates and assign them to the nodes
DataVisualizer.prototype.loadCoordinates = function(json) {
  for(var j in json) {
    console.log(json[j].x);
    console.log(json[j].y);
    console.log(json[j].name);
    this.getNodeByName(json[j].name, 0).x = json[j].x;
    this.getNodeByName(json[j].name, 0).y = json[j].y;
  }
};

DataVisualizer.prototype.getNodeByName = function(name, ts) {
  for(var i in this.nodes[ts]) {
    if(this.nodes[ts][i].name == name) {
      return this.nodes[ts][i];
    }
  }
};

// Initialize the force layout with the loaded and converted data
DataVisualizer.prototype.visualize = function() {
  var that = this;

  console.log('Viz!!' + this.timestamp);
  //visualization.initialize("#graph", '{' +'"nodes" : "' + this.nodes +'"links" : "' + this.links + '"}');
  var graph = {};
  graph.nodes = this.nodes[this.timestamp];
  graph.links = this.links[this.timestamp];

  // Layout construction for this visualization istance
  this.visualizationDiv = d3.select("#graph").append("div")
  .attr("id", "visualization_div_" + this.visid)
  .style("width", "100%")
  .style("height", "100%");

  this.plotsDiv = this.visualizationDiv.append("div")
  .attr("id", "plots_div_" + this.visid)
  .style("width", "100%")
  .style("height", "80%")
  .style("display","flex");

  this.graphDiv = this.plotsDiv.append("div")
  .attr("id", "graph_div_" + this.visid)
  .style("width", "95%")
  .style("height", "100%");

  this.projectionDiv = this.plotsDiv.append("div")
  .attr("id", "projection_div_" + this.visid)
  .style("width", "5%")
  .style("height", "100%")
  .style('background-color', 'black')
  .style("background-size", "cover")
  .style("background-repeat", "no-repeat")
  //background-position: 50% 50%;
  .on("click", function() {
    if(!that.projectionOn) {
     that.projectionDiv
     .transition()
     .duration(2000)
     .style('width', '60%')
     .style("background-image", "url(http://mtanzi3.people.uic.edu/composition.png)");

     that.graphDiv
     .transition()
     .duration(2000)
     .style('width', '40%');

     that.projectionOn = true;
   } else {
     that.projectionDiv
     .transition()
     .duration(2000)
     .style('width', '5%')
     .style("background-image", "none");

     that.graphDiv
     .transition()
     .duration(2000)
     .style('width', '95%');

     that.projectionOn = false;
   }
 });


  this.controlsDiv = this.visualizationDiv.append("div")
  .attr("id", "controls_div_" + this.visid)
  .style("width", "100%")
  .style("height", "20%")
  .style("display","flex");


  this.activeGraph = new Graph("#graph_div_" + this.visid, graph, "#projection_div_" + this.visid);
  // GraphZoomButton("#graph", this.graphs[this.timestamp], this.timestamp);
  //new GraphDeZoomButton("#graph", this.graphs[this.timestamp], this.timestamp);
  new GraphZoomButton("#controls_div_" + this.visid, this.activeGraph, this.visid);
  new GraphDeZoomButton("#controls_div_" + this.visid, this.activeGraph, this.visid);


  //this.timestamp++;
};

// Change timestamp of the visualized graph
DataVisualizer.prototype.change = function(slide) {
  this.timestamp += slide;
  var graph = {};
  graph.nodes = this.nodes[this.timestamp];
  graph.links = this.links[this.timestamp];
  console.log(graph);
  this.activeGraph.change(graph);
};
