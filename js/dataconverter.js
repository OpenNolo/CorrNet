// module that implements convertion functions starting from an array of files

var DataConverter = function() {
};


// functions that converts data without grouping to JSON and return the JSON,
// in order to have it in global scope
DataConverter.prototype.convertFiles = function(files) {
  var json = [];

  for(var i in files) {
    json.push(this.convertFile(files[i]));
  }

  return json;
};

DataConverter.prototype.convertFile = function(data) {
  var json = [];
  var items;
  var lineParse = "";

  items = data.split('\n');
  //console.log(items);
  for(var i in items) {
    var line = items[i].split('\t');
    if(line[0] != "") {
      lineParse = '{' +'"source" : ' + line[0] + ','
      + '"target" : ' + line[1] + ','
      + '"weight" : ' + line[2] + '}';
      //+ '"timestamp" : "' + timestamp + '"}';
      //console.log(JSON.parse(lineParse));
      json.push(JSON.parse(lineParse));
    }
  }
  console.log(json);
  return json;
};


// Convert multiple file of communities in to json
DataConverter.prototype.convertCommunitiesFiles = function(files) {
  var json = [];

  for(var i in files) {
    json.push(this.convertCommunitiesFile(files[i], false));
  }

  return json;
};

// Convert a single file containing the communities of each timestamp in to json
DataConverter.prototype.convertCommunitiesCompactFile = function(data) {
  console.log(data);

  var json = [];
  var files = [];

  var lines = data.split('\n');

  var j = lines[0].split('\t')[0];
  var file = [];
  for(var i = 0; i < lines.length - 1; i++) {
    var splitted = lines[i].split('\t');
    //var
    file.push(splitted[1] + '\t' + splitted[2]);
    if(lines[i + 1].split('\t')[0] != j) {
      j = lines[i + 1].split('\t')[0];
      files.push(file);
      file = [];
    }
  }

  var last = lines[lines.length - 1];
  file.push(last.split('\t')[1] + '\t' + last.split('\t')[2]);
  files.push(file);
  file = [];

  console.log(files);

  for(var f in files) {
    json.push(this.convertCommunitiesFile(files[f], true));
  }

  console.log(json);
  return json;
};

// Convert a single file of communities in json
DataConverter.prototype.convertCommunitiesFile = function(data, splitted) {
  var json = [];
  var items;
  var lineParse = "";

  //this.timestamp++;
  //var timestamp = this.timestamp;
  //console.log(data);

  // Check if data already splitted on lines
  if(splitted) {
    items = data;
  } else {
    items = data.split('\n');
  }
  console.log(items);
  for(var i in items) {
    var line = items[i].split('\t');
    if(line[0] != "" && line[0] != "undefined") {
      lineParse = '{' +'"name" : ' + line[0] + ','
      + '"community" : ' + line[1] + '}';
      //lineParse = JSON.stringify(lineParse);
      json.push(JSON.parse(lineParse));
    }
  }
  console.log(json);
  return json;
};

// Convert a file containing coordinates in JSON positions
DataConverter.prototype.convertCoordinatesFile = function(file) {
  var json = [];
  var items;
  var lineParse = "";

  items = file.split('\n');
  console.log(items);

  for(var i in items) {
    var line = items[i].split('\t');
    if(line[0] != "" && line[0] != "undefined" && line[1] != "" && line[1] != "undefined") {
      lineParse = '{' +  '"name" : ' + i + ',' + '"x" : ' + line[0] + ',' + '"y" : ' + line[1] + '}';
      console.log(lineParse);

      json.push(JSON.parse(lineParse));
    }
  }

  console.log(json);

  return json;
};
