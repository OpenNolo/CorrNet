var Projection = function(location, startingdata) {

  // Contains data to plot
  // the data have an attribute x and an attribute y
  this.dataset = [];
  if(startingdata.length) {
    this.dataset = startingdata;
    console.log(this.dataset.length);

    for(i = 0;i < this.dataset.length; i++) {
      console.log(i);
      this.dataset[i].active = 0;
    }
  }

  // Define SVG dimensions
  this.svgW = 1500;
  this.svgH = 1000;
  this.svgR = 0;
  this.svgT = 0;

  // Define Scales
  var xScale = d3.scale.linear()
  .domain([0, d3.max(this.dataset, function(d) { // Later scale on image dimensions
    return d.x;
  })])
  .range([0, this.svgW]);

  var yScale = d3.scale.linear()
  .domain([0, d3.max(this.dataset, function(d) {
    return d.y;
  })])
  .range([0, this.svgH]);



  // Create SVG element
  this.svg = d3.select(location).append("svg")
  .style("width","100%")
  .style("height","100%")
  .style('fill', "none")
  .attr("viewBox", this.svgR+" "+this.svgT+" "+this.svgW+" "+this.svgH);

  // Create starting scatterplot
  this.svg.selectAll("circle")
  .data(this.dataset)
  .enter()
  .append("circle")
  .attr("cx", function(d) {
    return xScale(d.x);
  })
  .attr("cy", function(d) {
    return yScale(d.y);
  })
  .attr("r", 30)
  .attr('stroke-width', 5)
  .attr("stroke", "#99000d")
  .attr('fill', 'rgba(123, 245, 100, 0)')
  .style("opacity", function(d) {
    //console.log(d.active);
    return d.active;
  });

   // Add labels
   this.svg.selectAll("text")
   .data(this.dataset)
   .enter()
   .append("text")
   .text(function(d) {
    return d.name;
  })
   .attr("x", function(d) {
    return xScale(d.x);
  })
   .attr("y", function(d) {
    return yScale(d.y);
  })
   .attr("font-family", "sans-serif")
   .attr("font-size", "30px")
   .attr("fill", "blue")
   .style("opacity", function(d) {
    //console.log(d.active);
    return d.active;
  });


 };

 Projection.prototype.setNode =  function(node) {

  // Update actives in the dataset
  for(i = 0; i < this.dataset.length; i++) {
    if(this.dataset[i].name == node.name) {
      if(this.dataset[i].active == 1) {
        this.dataset[i].active = 0;
      } else {
        this.dataset[i].active = 1;
      }
    }
  }

  // Update visualization of actives
  this.svg.selectAll("circle")
  .transition()
  .duration(1500)
  .style("opacity", function(d) {
    console.log('in');
    return d.active;
  });

  // Add labels
  this.svg.selectAll("text")
  .transition()
  .duration(1500)
  .style("opacity", function(d) {
    //console.log(d.active);
    return d.active;
  });

};
