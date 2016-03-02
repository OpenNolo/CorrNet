var DataChangerButton = function (location, dataVisualizer) {
  $(location).append('<svg width="100%" height="100%" viewBox="0 0 400 21">\n'
                     + '<foreignObject x="0" y="0" width="100%" height="100%">\n'
                     + '<button id="change">Change</button>\n'
                     + '</foreignObject>\n'
                     + '</svg>');

  this.visualizeButton = $('#change');
  this.visualizeButton.on('click', function() {
    dataVisualizer.change();
  });
};
