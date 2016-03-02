var DataVisualizer = function (visualization) {
  this.timestamp = 0;
  this.nodes = [];
  this.links = [];
  this.graphs = [];

};
/*
// generates nodes exploring the indices in all links
DataManager.prototype.linksToNodes = function(links) {
  var dict = {};
  var nodes = [];
  var links = this.links[0];

  for(var i in links) {
    if(dict[links[i].source] == 0) {

    } else {
      dict[] == 1;
    }
    if(dict[links[i].target] == 0) {

    } else {
      dict[] == 1;
    }
  }
};

*/

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

/*
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

  //console.log(this.nodes);
  //console.log(this.links);
  */
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
  console.log('Viz!!' + this.timestamp);
  //visualization.initialize("#graph", '{' +'"nodes" : "' + this.nodes +'"links" : "' + this.links + '"}');
  var graph = {};
  graph.nodes = this.nodes[this.timestamp];
  graph.links = this.links[this.timestamp];
  this.graphs[this.timestamp] = new Graph("#graph", graph);
  new GraphZoomButton("#graph", this.graphs[this.timestamp], this.timestamp);
  new GraphDeZoomButton("#graph", this.graphs[this.timestamp], this.timestamp);

  this.timestamp++;
};
