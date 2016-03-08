var GraphDeZoomButton = function (location, graph, visid) {
  $(location).append('<svg width="100%" height="100%" viewBox="0 0 400 21">\n'
                     + '<foreignObject x="0" y="0" width="100%" height="100%">\n'
                     + '<button id="dezoom' + visid + '">+</button>\n'
                     + '</foreignObject>\n'
                     + '</svg>');

  this.visualizeButton = $('#dezoom' + visid);
  this.visualizeButton.on('click', function() {
    graph.resizeForceGraph(-250);
  });
};
