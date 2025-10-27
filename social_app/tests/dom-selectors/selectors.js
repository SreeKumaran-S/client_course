const SELECTORS = {
  userName: "userName",
  userEmail: "userEmail",
  userMobile: "userMobile",
  userDOB: "userDOB",
  userGender: "userGender",
  reset: "Reset",
  signup: "Signup",
  notificationComp: "notificationComp",
  recheckMobileDobGender: "Recheck these incorrect fields:\nmobile\ndob\ngender",
  recheckEditModeIsEnabled: "Kindly enable edit mode ON to perform the operation",
  dataDeletedInDb: "Wipped your data in db",
  dataUpdateInDb: "Yaay updated your data in db !!",
  addUsers: "Add Users",
};

const URLS = {
    home : ()=> `/`,
    addUser : ()=> `/addUser`,
    updateUser : ()=> `/updateUser`,
    host: ()=> `http://localhost:3000`,
    server: ()=> `http://localhost:4000`,
    userUrl: ()=> `/users_data`
};
export {
    SELECTORS,
    URLS
}