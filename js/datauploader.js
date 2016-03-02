// module that implements the upload of multiple files

var DataUploader = function() {
  this.files = [];
};

DataUploader.prototype.upload = function(fileInput, callback) {
  if (!window.FileReader) {
    alert('Your browser is not supported');
    return false;
  }

  this.files = [];

  // Clean from previously saved files;
  //this.file = [];

  var input = fileInput.get(0);

  if (input.files.length) {
    this.readFile(input, 0, callback);
  } else {
    alert('Please upload a file before continuing');
  }
};

DataUploader.prototype.readFile = function(input, i, callback) {
  that = this;

  if(i < input.files.length) {
    var reader = new FileReader();
    var textFile = input.files[i];
    // Read the file
    reader.readAsText(textFile);
    // When it's loaded, process it
    $(reader).on('load', function(e) { that.processFile(e, input, i, callback); });
    //$(reader).on('loadend');
  } else {
    console.log(this.files);
    //return this.files;
    callback(this.files);
  }
};

DataUploader.prototype.processFile = function(e, input, i, callback) {
  this.files.push(e.target.result);
  this.readFile(input, ++i, callback);
};

DataUploader.prototype.getFiles = function() {
  return this.files;
};


