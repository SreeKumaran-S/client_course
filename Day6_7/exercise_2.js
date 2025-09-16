(function(){
    let suffixes = ["st", "nd", "rd", "th"];
    let getHumanised = (num)=>{
        let last_two_digits = num % 100;
        
        if (last_two_digits >= 11 && last_two_digits <= 13) {
            return num + suffixes[3]; 
        }
        
        let lastDigit = num % 10;
        if (lastDigit >= 1 && lastDigit <= 3) {
            return num + suffixes[lastDigit - 1];
        } else {
            return num + suffixes[3]; 
        }
    };
    
    for(let i=1000;i<=10000;i++){
       console.log(getHumanised(i));
    }

})();