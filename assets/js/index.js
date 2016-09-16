$(document).ready(function(){

  var graphModel = new Graph();
  var tableModel = new Table();
  // Bind a Graph model to the view
  var myGraph = new GraphView({ model: graphModel });
  var myTable = new TableView({ model: tableModel });
});
