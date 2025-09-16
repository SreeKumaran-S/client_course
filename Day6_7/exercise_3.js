(function(){
    let repeatString = (str, count=0)=>{
        let produced_string ="";
        while(count > 0 ){
            produced_string = produced_string.concat(str);
            count--;
        }
        console.log(produced_string);
    };
    
    repeatString("Zoho-Desk",5);

})();