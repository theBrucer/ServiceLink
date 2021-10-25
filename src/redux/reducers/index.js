import { combineReducers } from "redux";
import authReducer from './authReducer';
import leadGeneratorReducer from './leadGeneratorReducer';
import technicianReducer from './technicianReducer';
import jobReducer from './jobReducer';
import {LOG_OUT} from '../actions/actionTypes'
import history from "../../history"


const appReducer = combineReducers({
    auth: authReducer,
    technicians: technicianReducer,
    leadGenerators: leadGeneratorReducer,
    jobs: jobReducer
})


const rootReducer = (state, action) => {
    
    if(action.type === LOG_OUT) {

        console.log("we are logging out")

        return appReducer(undefined, action);
    }
    
    return appReducer(state, action)
};

export default rootReducer;


export const logOutUser = () => async (dispatch) => {

    console.log("logging user out");

    history.push("/")

    localStorage.clear();

    dispatch({
        type: LOG_OUT
    });


    console.log("we're about to go back to homepage")
    
}