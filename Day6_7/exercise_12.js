(function () {
  let rows = 5;
  for(let i=rows; i>0; i--){
    let pattern = "";
    for(let j=0; j<i; j++){
       pattern += "* ";
    }
    console.log(pattern);
  }
})();