(function(){
    let original_string = "Client Course";
    let insertString = (newString, index = 1)=>{
        // let modified_string = original_string.substring(0,index)
        //                                      .concat(newString)
        //                                      .concat(original_string.substring(index));

        let modified_string = `${original_string.slice(0, index)}${newString}${original_string.slice(index)}`;
        console.log(modified_string);
    };

    insertString("iron-man",1)
})();