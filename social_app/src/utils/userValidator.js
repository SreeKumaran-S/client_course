export function validateUserData(username_val, useremail_val, usermobilenum_val, userdateofbirth_val, usergender_val) {
    let validateFields = {
        name: validateName(username_val),
        email: validateEmail(useremail_val),
        mobile: validateMobile(usermobilenum_val),
        dob: validateDOB(userdateofbirth_val),
        gender: validateGender(usergender_val)
    };

    let invalidFields = Object.keys(validateFields).filter(k => !validateFields[k]);
    
    return invalidFields;
}

export function validateName(userName) {
    return !!userName?.length;
}
export function validateEmail(userEmail) {
    let regexPattern = /[a-zA-Z0-9_\-.]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,4}$/;
    return regexPattern.test(userEmail);
}
export function validateMobile(userMobile) {
    let regexPattern = /^\+91\s?[6-9][0-9]{9}$/;
    return regexPattern.test(userMobile);
}
export function validateGender(userGender) {
    let regexPattern = /^(male|female|transgender)$/;
    return regexPattern.test(userGender);
}
export function validateDOB(userDOB) {
    let dob = new Date(userDOB);
    let today = new Date();
    return !!userDOB && today > dob;
}