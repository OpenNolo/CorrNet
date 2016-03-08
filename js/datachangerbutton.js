var DataChangerButton = function (location, dataVisualizer, slide) {
  $(location).append('<svg width="100%" height="100%" viewBox="0 0 400 21">\n'
                     + '<foreignObject x="0" y="0" width="100%" height="100%">\n'
                     + '<button id="change_' + slide + '">Change ' + slide + '</button>\n'
                     + '</foreignObject>\n'
                     + '</svg>');

  this.visualizeButton = $('#change_' + slide);
  this.visualizeButton.on('click', function() {
    dataVisualizer.change(slide);
  });
};
