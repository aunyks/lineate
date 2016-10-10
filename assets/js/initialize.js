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

// Return a function that can compute the regression points
function lineRegress(points){
  var linearEquation = linearRegress(points);
  return {
    func: function(x){
      return (x * linearEquation.m) + linearEquation.b;
    },
    m: linearEquation.m,
    b: linearEquation.b
  };
}

function polynomialRegress(points){
  var equation = polyRegress(points);
  return {
    func: function(x){
      return ( (equation.a * (x * x)) + (equation.b * x) + equation.c);
    },
    a: equation.a,
    b: equation.b,
    c: equation.c
  };
}

Number.prototype.decimalPlaces = function(digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};

skel.breakpoints({
    xlarge: "(min-width: 1680px)",
    large:  "(min-width: 1280px)",
    medium: "(min-width: 980px)",
    small:  "(min-width: 736px)",
    xsmall: "(min-width: 480px)"
});
