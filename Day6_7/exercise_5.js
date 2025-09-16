(function () {
    let students = ["hulk", "iron-man", "steve", "clint"];

    let findStudent = (student_name) => {
        student_name = student_name.toLowerCase();
        let student_index = students.findIndex((student) => {
            return student === student_name;
        });
        
        let result;
        if(student_index >= 0){
          result =  `Student ${student_name} found at index ${student_index}`;   
        }
        else{
          result =  "Student data not found"; 
        }
       
        return result;
        
    };

    console.log(findStudent("Iron-mAn"));

})();