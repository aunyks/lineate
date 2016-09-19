// If value is a number, return it
// otherwise, return 0
function castNumber(val){
  return ($.isNumeric(val)) ? Number(val) : 0;
}

// Create an array of string numbers between a min and max value
function fillRange(min, max){
  var list = [];
  for (var i = min; i <= max; i++) {
      list.push( (''+i) );
  }
  return list;
}


// Convert points: {x: a, x: b} -> [a, b]
function filterPoints(arrPoints){
  var points = [];
  for(var i = 0; i < arrPoints.length; i++){
    points.push( [arrPoints[i].x, arrPoints[i].y] );
  }
  return points;
}

// Return a function that can compute the regression points
function lineRegress(points){
  var rawPoints = filterPoints(points);
  var linearEquation = ss.linearRegression(rawPoints);

  return {
    func: function(x){
      return (x * linearEquation.m) + linearEquation.b;
    },
    m: linearEquation.m,
    b: linearEquation.b
  };
}

Number.prototype.decimalPlaces = function(digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};
