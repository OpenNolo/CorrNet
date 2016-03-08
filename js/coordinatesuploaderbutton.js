var CoordinatesUploaderButton = function(location, dataUploader, dataConverter, dataVisualizer) {

  //$(location).append('m<input type="file" id="files" name="files[]" multiple />');
  $(location).append('<svg width="100%" height="100%" viewBox="0 0 400 21">\n'
                     + '<foreignObject x="0" y="0" width="100%" height="100%">\n'
                     + '<input type="file" id="coordinates_file" name="files[]" multiple />\n'
                     + '</foreignObject>\n'
                     + '<foreignObject x="200" y="0" width="100%" height="100%">\n'
                     + '<button id="upload_coordinates">Upload</button>\n'
                     + '</foreignObject>\n'
                     + '</svg>');
  //<output id="list"></output>

  this.uploadButton = $('#upload_coordinates');

  this.uploadButton.on('click', function() {
    dataUploader.singleUpload($('#coordinates_file'), function(files) {
      console.log(files);
      var filesConverted = dataConverter.convertCoordinatesFile(files);
      console.log(filesConverted);
      dataVisualizer.loadCoordinates(filesConverted);
    });
  });

};
