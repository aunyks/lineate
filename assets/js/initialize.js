// Create Graph model, this will store all data
// pertaining to the Chart
var Graph = Backbone.Model.extend({
  // Default values:
  // Imply 'f(x)=' for equation value
  defaults: {
    'numPoints': 0,
    'bestLine': 'linear',
    'equation': '0'
  },
  rawPoints: [],
  regressionPoints: [],
});

var GraphView = Backbone.View.extend({

  // Bind the view to the canvas in index.html
  el: '#graph',

  // Build the chart object on initialization
  initialize: function(){
    this.model.on('change', this.render, this);

    this.chart = new Chart(this.$el, {
        type: 'line',
        // TODO: Make labels 0 to x-max
        labels: [],
        data: {
          datasets: [{
            label: 'Scattered Points',
            backgroundColor: '#fff',
            pointBackgroundColor: '#00f',
            data: this.model.rawPoints
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
  },

  // Should be called each time model a new point is added
  render: function(){
    this.chart.update();
  }
});

var Table = Backbone.Model.extend({
  defaults: {
    'numRows': 0,
    'points': []
  }
});

var TableView = Backbone.View.extend({
  // Bind view to table in index.html
  el: '#table',
  
  events: {
    'click #plus': 'addRow'
    // Add keyup event
  },

  initialize: function(){

  },

  render: function(){
    this.$el.click(function(){
      //
    });
  },
  
  addRow: function(){
    this.model.numRows += 1;
  },

  bindGraph: function(graphModel){
    this.graph = graphModel;
  }
});

/*$('#plus').click(function(){
  var child = $('<td></td>').text('hey');
  var child0 = $('<td></td>').text('bye');
  $('tbody').append( $('<tr></tr>').append(child).append(child0));
});*/
