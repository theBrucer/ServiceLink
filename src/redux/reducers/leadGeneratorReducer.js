import _ from 'lodash';
import {
    CREATE_LEADGENERATOR,
    DELETE_LEADGENERATOR,
    UPDATE_LEADGENERATOR, FETCH_LEADGENERATOR,
    FETCH_LEADGENERATORS
} from "../actions/actionTypes";


let INITIAL_STATE = {
    1: {
        _id: 1,
        user: 32,
        name: "Edon Generator",
        phoneNumber: "8188884888",
        fee: "20",
        notes: "This is the first lead generator"
    },
    2: {
        _id: 2,
        user: 32,
        name: "Ben Generator",
        phoneNumber: "8184822522",
        fee: "25",
        notes: "This is the second generator"
    }
}

// Resetting state
INITIAL_STATE = {};


const leadGeneratorReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {

        case FETCH_LEADGENERATOR:

            return { ...state, [payload._id]: [payload] }

        case FETCH_LEADGENERATORS:
            return { ...state, ..._.mapKeys(payload, "_id") };

        case CREATE_LEADGENERATOR:
            return { ...state, [payload._id]: { ...payload } }

        case DELETE_LEADGENERATOR:
            return _.omit(state, payload);

        case UPDATE_LEADGENERATOR:
            return { ...state, [payload._id]: payload }

        default:
            return state
    }
};

export default leadGeneratorReducer;
