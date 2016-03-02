var CommunitiesUploaderButton = function(location, dataUploader, dataConverter, dataVisualizer) {

  //$(location).append('m<input type="file" id="files" name="files[]" multiple />');
  $(location).append('<svg width="100%" height="100%" viewBox="0 0 400 21">\n'
                     + '<foreignObject x="0" y="0" width="100%" height="100%">\n'
                     + '<input type="file" id="community_files" name="files[]" multiple />\n'
                     + '</foreignObject>\n'
                     + '<foreignObject x="200" y="0" width="100%" height="100%">\n'
                     + '<button id="upload_communities">Upload</button>\n'
                     + '</foreignObject>\n'
                     + '</svg>');
  //<output id="list"></output>

  this.uploadButton = $('#upload_communities');

  this.uploadButton.on('click', function() {
    dataUploader.upload($('#community_files'), function(files) {
      console.log(files);
      var filesConverted = dataConverter.convertCommunitiesCompactFile(files);
      console.log(filesConverted);
      dataVisualizer.loadCommunitiesFromJSON(filesConverted);
    });
  });

};
