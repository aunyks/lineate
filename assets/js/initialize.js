// If value is a number, return it
// otherwise, return 0
function castNumber(val){
  return ($.isNumeric(val)) ? Number(val) : 0;
}
