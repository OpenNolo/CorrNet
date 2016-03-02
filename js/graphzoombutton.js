var GraphZoomButton = function (location, graph, timestamp) {
  $(location).append('<svg width="100%" height="100%" viewBox="0 0 400 21">\n'
                     + '<foreignObject x="0" y="0" width="100%" height="100%">\n'
                     + '<button id="zoom' + timestamp + '">-</button>\n'
                     + '</foreignObject>\n'
                     + '</svg>');

  this.visualizeButton = $('#zoom' + timestamp);
  this.visualizeButton.on('click', function() {
    graph.resizeForceGraph(250);
  });
};
