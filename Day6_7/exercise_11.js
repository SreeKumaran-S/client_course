(function () {
  let rows = 5;
  for(let i=0; i<rows; i++){
    let pattern = "";
    for(let j=0; j<=i; j++){
       pattern += "* ";
    }
    console.log(pattern);
  }
})();