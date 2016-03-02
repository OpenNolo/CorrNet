var App = function() {

  this.dc = new DataConverter();
  this.dv = new DataVisualizer();
  this.du = new DataUploader();

  this.duButton = new DataUploaderButton("#upload_button", du, dc, dv);
  this.duButton = new CommunitiesUploaderButton("#upload_communities_button", du, dc, dv);
  this.dvButton = new DataVisualizerButton("#visualize_button", dv);
  this.dvButton = new DataChangerButton("#change_button", dv);
};
