/*
    This object is used like so:
    Upon login, populate this object with the information
    received from the database while simultaneously 
    storing the data in their local storage

    Whenever a user goes to leadeem.com, first thing
    is to check if this user is logged in. If so, update 
    the redux store with the data

    This link is good: https://stackoverflow.com/questions/42420531/what-is-the-best-way-to-manage-a-users-session-in-react

    Storing token:
    localStorage.setItem('session',JSON.stringify(token));

*/

const userData = (function() {

    let _id = "";
    let token
    let twilioPhoneNumber
    let accountStatus
    let accountName
    let contactPhoneNumber
    let userEmail
    let userEmailConfirmed
    let jobLogFilters

    let setUserData = function(userData) {

    }

    let getUserData = function() {
        // Get the data from local storage

    }

})();

export default UserData