var DataVisualizerButton = function (location, dataVisualizer) {
  $(location).append('<svg width="100%" height="100%" viewBox="0 0 400 21">\n'
                     + '<foreignObject x="0" y="0" width="100%" height="100%">\n'
                     + '<button id="visualize">Viz</button>\n'
                     + '</foreignObject>\n'
                     + '</svg>');

  this.visualizeButton = $('#visualize');
  this.visualizeButton.on('click', function() {
    dataVisualizer.visualize();
  });
};
