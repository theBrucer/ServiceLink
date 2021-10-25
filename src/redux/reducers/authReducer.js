
import { ALL_JOBS, NEWEST_FIRST } from "../../components/jobLog/jobLogFilters/FilterTypes";
import { fetchLocalStorage } from "../../Utility/AuthUtils";
import { ACTIVE, SIGN_UP, LOG_IN, LOG_OUT, EDIT_USER, FETCH_USER, APPLY_JOBLOG_FILTERS } from "../actions/actionTypes";

let INITIAL_STATE = {
    userId: 32,
    accountName: "Edon's Dispatching Business",
    userEmail: "edon@leadeem.com",
    userEmailConfirmed: true,
    twilioPhoneNumber: 16513141734,
    contactPhoneNumber: 8181234567,
    accountStatus: ACTIVE,
    jobLogFilters: {sortBy: NEWEST_FIRST, jobStatus: ALL_JOBS}
};

// Resetting state
INITIAL_STATE = fetchLocalStorage();



const authReducer = (state = INITIAL_STATE, { type, payload }) => {

    switch (type) {

        case LOG_IN:
            return payload || false;

        case LOG_OUT:
            return {  }

        case SIGN_UP:
            return {...state, ...payload}

        case FETCH_USER:    
            return { ...state};
        
        case EDIT_USER:
                return {...state, ...payload};


        case APPLY_JOBLOG_FILTERS:
            let userInfo = {...state.userInfo};
            userInfo.jobLogFilters = payload;

            return {...state, userInfo}

        default:
            return state
    }

};

export default authReducer;


