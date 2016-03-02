var DataUploaderButton = function(location, dataUploader, dataConverter, dataVisualizer) {

  //$(location).append('m<input type="file" id="files" name="files[]" multiple />');
  $(location).append('<svg id="svg_upload" width="100%" height="100%" viewBox="0 0 400 21">\n'
                     //+ '<rect x="0" y="0" width="95" height="21" fill="blue" />\n'
                     + '<foreignObject x="0" y="0" width="253" height="21" opacity="1">\n'
                     + '<input type="file" id="files" name="files[]" multiple />\n'
                     + '</foreignObject>\n'
                     + '<foreignObject x="253" y="0" width="100%" height="100%">\n'
                     + '<button id="upload">Upload</button>\n'
                     + '</foreignObject>\n'
                     + '</svg>');
  //<output id="list"></output>

  // Create and append a fake button to hide the default of HTML non-css-editable.
  /*var fakeButtonWidth = $('input').attr("width");
  var fakeButtonHeight = $('input').attr("height");
  console.log($('input').attr("width"));
  console.log(fakeButtonHeight);
  d3.select('#svg_upload').append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', fakeButtonWidth)
      .attr('height', fakeButtonHeight)
      .attr('rx', 0)
      .attr('ry', 0)
      .style('fill', 'blue');*/

  this.uploadButton = $('#upload');

  this.uploadButton.on('click', function() {
    dataUploader.upload($('#files'), function(files) {
      console.log(files);
      var filesConverted = dataConverter.convertFiles(files);
      console.log(filesConverted);
      dataVisualizer.loadDataFromJSON(filesConverted);
    });
  });

};
