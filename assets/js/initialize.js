// If value is a number, return it
// otherwise, return 0
function castNumber(val){
  return ($.isNumeric(val)) ? Number(val) : 0;
}

function fillRange(min, max){
  var list = [];
  for (var i = min; i <= max; i++) {
      list.push((''+i));
  }
  return list;
}


// Get y values of given points
function filterY(arrPoints){
  var yPoints = [];
  for(var i = 0; i < arrPoints.length; i++){
    yPoints.push(arrPoints[i].y);
  }
  console.log(yPoints)
  return yPoints;
}
