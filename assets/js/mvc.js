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

    this.chart = new Chart(this.$el, {
        type: 'line',
        labels: function(){
                  var list = [];
                  for (var i = this.model.minX; i <= this.model.maxX; i++) {
                      list.push(i);
                  }
                  console.log(list);
                  return list;
        },
        data: {
          datasets: [{
            label: 'Scattered Points',
            backgroundColor: '#fff',
            pointBackgroundColor: '#00f',
            data: this.model.points
          }, {
            label: 'Regression Line',
            backgroundColor: '#fff',
            pointBackgroundColor: '#f00',
            borderColor: '#f00',
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
          responsiveAnimationDuration: 500,
          title: {
            position: 'top',
            fontColor: '#000',
            text: 'Lineate',
            fontSize: 43
          }
        }
      });
      this.model.on('change', this.render(), this);
  },

  // Should be called each time model a new point is added
  render: function(){
    this.chart.update();
    console.log('Chart updated');
  }

});

var TableView = Backbone.View.extend({
  // Bind view to table in index.html
  el: '#table',

  events: {
    'click #plus': 'addRow',
    'keyup .input-cell': 'addPoint'
  },

  initialize: function(){

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
    this.model.set({
      'minX': minX,
      'maxX': maxX,
      'numPoints': gotPoints.length,
      'points': gotPoints
    });
  },

  bindGraph: function(graphModel){
    this.graph = graphModel;
  }
});
