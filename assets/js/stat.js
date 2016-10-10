// Minimum value in the set
var min = function(data){
  return data.reduce(function(previousValue, currentValue, currentIndex, array){
    if(previousValue > currentValue)
      return currentValue;
    else
      return previousValue;
  }, Number.MAX_VALUE);
};

// Maximum value in the set
var max = function(data){
  return data.reduce(function(previousValue, currentValue, currentIndex, array){
    if(previousValue < currentValue)
      return currentValue;
    else
      return previousValue;
  }, Number.MIN_VALUE);
};

// Median
var median = function(data){
  // Clone data bc immutability is important
  var dataClone = data.slice(0);
  // Sort array
  dataClone.sort(function(a, b){
    return a - b;
  });

  if(dataClone.length % 2 == 1)
    return dataClone[Math.floor(dataClone.length / 2)];
  else
    return ( (dataClone[Math.floor(dataClone.length / 2)] + dataClone[Math.floor(dataClone.length / 2) - 1]) / 2 );
};

// Uppercase(Big) Sigma
// Summation of elements in a set
var bigSig = function(data){
  return data.reduce(function(previousValue, currentValue, currentIndex, array) {
    return previousValue + currentValue;
  });
};

// Mean (Average) (Mu) (X-Bar)
// x-bar = sum of all elements of set / the number of elements in the set
var mean = function(data){
  var sum = bigSig(data);
  return (sum / data.length);
};

var variance = function(data){
  var mu = mean(data);
  // (x-sub-i - mean)^2
  var a = data.map(function(xSubI){
    return Math.pow((xSubI - mu), 2);
  });
  // sum( (x-sub-i - mean)^2 );
  var b = bigSig(a);
  return (b / data.length);
};

// Lowercase(Small) Sigma: Standard deviation
// The average distanace from the mean of each element in the set
var smallSig = function(data){
  return Math.sqrt(variance(data));
};

// Line of best fit
// f(x) = mx + b
var linearRegress = function(points){
  var xVals = points.map(function(point){
    return point.x;
  });
  var yVals = points.map(function(point){
    return point.y;
  });
  var xxVals = xVals.map(function(x){
    return (x * x);
  });
  var xyVals = points.map(function(point){
    return (point.x * point.y);
  });

  var sumX = bigSig(xVals);
  var sumY = bigSig(yVals);
  var sumXX = bigSig(xxVals);
  var sumXY = bigSig(xyVals);

  var slope = ((points.length * sumXY) - (sumX * sumY)) /
              ((points.length * sumXX) - (sumX * sumX));
  //var intercept = (sumY / points.length) - ((slope * sumX) / points.length);
  var intercept = (points[0].y - (slope * points[0].x));

  if(isNaN(slope))
    slope = 0;
  if(isNaN(intercept))
    intercept = 0;
  return {
    m: slope,
    b: intercept
  };
};

// Polynomial regression
// f(x) = ax^2 + bx + c
var polyRegress = function(points){
  var xVals = points.map(function(point){
    return point.x;
  });
  var xxVals = xVals.map(function(x){
    return (x * x);
  });
  var x3Vals = xVals.map(function(x){
    return (x * x * x);
  });
  var x4Vals = xVals.map(function(x){
    return (x * x * x * x);
  });
  var yVals = points.map(function(point){
    return point.y;
  });
  var xyVals = points.map(function(point){
    return (point.x * point.y);
  });
  var x2yVals = points.map(function(point){
    return ( (point.x * point.x) *  point.y);
  });

  var n = points.length;
  var sumX = bigSig(xVals);
  var sumXX = bigSig(xxVals);
  var sumX3 = bigSig(x3Vals);
  var sumX4 = bigSig(x4Vals);
  var sumY = bigSig(yVals);
  var sumXY = bigSig(xyVals);
  var sumX2Y = bigSig(x2yVals);

  // Matrix 1 (array)
  var dMatrix = [
    [n,     sumX,  sumXX],
    [sumX,  sumXX, sumX3],
    [sumXX, sumX3, sumX4]
  ];
  // Matrix 2 (matrix)
  var eMatrix = math.matrix([
    [sumY],
    [sumXY],
    [sumX2Y]
  ]);

  var resultMatrix = math.multiply(math.inv(dMatrix), eMatrix);

  return {
    c: math.subset(resultMatrix, math.index(0, 0)),
    b: math.subset(resultMatrix, math.index(1, 0)),
    a: math.subset(resultMatrix, math.index(2, 0))
  };
};
