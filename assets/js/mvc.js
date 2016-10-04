// Create Graph model, this will store all data
// pertaining to the Chart
var Graph = Backbone.Model.extend({
  // Default values:
  // Imply 'f(x)=' for equation value
  defaults: {
    'numPoints': 0,
    'numRows': 0,
    'bestLine': 'linear',
    'equation': '0',
  },
  points: [],
  regressionPoints: [],
  minX: 0,
  maxX: 0,
});

var GraphView = Backbone.View.extend({

  // Bind the view to the canvas in index.html
  el: '#graph',

  // Build the chart object on initialization
  initialize: function(){
    this.chartData = {
        type: 'line',
        labels: fillRange(this.model.minX, this.model.maxX),
        data: {
          datasets: [{
            label: 'Scattered Points',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            pointBackgroundColor: '#00f',
            pointRadius: 10,
            data: this.model.points
          }, {
            label: 'Regression Line',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            pointBackgroundColor: '#f00',
            borderColor: '#f00',
            pointRadius: 10,
            data: this.model.regressionPoints
          }]
        },
        options: {
          scales: {
            xAxes: [{
              type: 'linear',
              position: 'bottom'
            }]
          },
          responsive: true,
          responsiveAnimationDuration: 250,
          title: {
            position: 'top',
            fontColor: '#000',
            text: 'Lineate',
            fontSize: 43
          },
          scaleGridLineColor: "black",
          pointDotRadius: 50,
          bezierCurve: false
        }
      };
      this.chart = new Chart(this.$el, this.chartData);
  },

  render: function(){

  },

  // Called each time a new value added to point table
  sync: function(){
    this.chart.data.datasets[0].data = this.model.points;
    this.chart.data.datasets[1].data = this.model.regressionPoints;
    this.chart.labels = fillRange(this.model.minX, this.model.maxX);
    document.getElementById('fofx').innerHTML = ('Best fit: <strong>f(x)=</strong> ' + this.model.equation);
    this.chart.update();
  }

});

var TableView = Backbone.View.extend({
  // Bind view to table in index.html
  el: '#table',

  events: {
    'click #plus': 'addRow',
    'keyup .input-cell': 'addPoint'
  },

  initialize: function(options){
    this.graphView = options.graphView;
  },

  render: function(){

  },

  addRow: function(){
    // Add a row and update model
    var cell = $('<td></td>').attr('class', 'cell').html('<input class="input-cell" type="text" placeholder="0">');
    $('tbody').append( $('<tr></tr>').append( cell ).append( cell.clone() ));
    this.model.numRows += 1;
  },

  addPoint: function(){
    // Sync all points and update model
    var gotPoints = [];
    var minX = Number.MAX_VALUE;
    var maxX = Number.MIN_VALUE;

    // Loop through a row, i is a left cell, i + 1 is a right cell
    for(var i = 0; i < $('.input-cell').length; i += 2){
      var obj = {};
      obj.x = castNumber($('.input-cell').eq(i).val());
      obj.y = castNumber($('.input-cell').eq(i + 1).val());
      gotPoints.push(obj);

      if($('.input-cell').eq(i).val() < minX){
        minX = $('.input-cell').eq(i).val();
      }
      if($('.input-cell').eq(i).val() > maxX){
        maxX = $('.input-cell').eq(i).val();
      }
    }
    this.model.minX = minX;
    this.model.maxX = maxX;
    this.model.numPoints = gotPoints.length;
    this.model.points = gotPoints;
    var regressObj = lineRegress(gotPoints);
    var fOfX = regressObj.func;
    var slope = regressObj.m;
    var intercept = regressObj.b.decimalPlaces(2);

    var gotRegressPoints = [];
    for(var i = 0; i < gotPoints.length; i++){
      gotRegressPoints.push({ x: gotPoints[i].x, y: fOfX(gotPoints[i].x) });
    }

    this.model.regressionPoints = gotRegressPoints;
    this.model.equation = '' + slope + 'x + ' + intercept;

    // Repaint chart
    this.graphView.sync();
  },

  bindGraph: function(graphModel){
    this.graph = graphModel;
  }
});
