var App = function() {

  this.dc = new DataConverter();
  this.dv = new DataVisualizer(1);
  this.du = new DataUploader();

  this.duButton = new DataUploaderButton("#upload_button", du, dc, dv);
  this.cuButton = new CommunitiesUploaderButton("#upload_communities_button", du, dc, dv);
  this.puButton = new CoordinatesUploaderButton("#upload_coordinates_button", du, dc, dv);
  this.dvButton = new DataVisualizerButton("#visualize_button", dv);
  this.dcPrevButton = new DataChangerButton("#change_button", dv, -1);
  this.dcNextButton = new DataChangerButton("#change_button", dv, +1);
};
