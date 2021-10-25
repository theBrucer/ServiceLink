import _ from "lodash"
import {
	CREATE_TECHNICIAN,
	DELETE_TECHNICIAN,
	UPDATE_TECHNICIAN,
	FETCH_TECHNICIAN,
	FETCH_TECHNICIANS,
} from "../actions/actionTypes"

let INITIAL_STATE = {
	1: {
		id: 1,
		userId: 32,
		name: "Edon Cohanim",
		phoneNumber: "8188888888",
		type: "Locksmith",
		commissionRate: "24",
		notes: "This is the first technician",
	},
	2: {
		id: 2,
		userId: 32,
		name: "Ben Rubin",
		phoneNumber: "8184892522",
		type: "Locksmith",
		commissionRate: "22",
		notes: "This is the second technician",
	},
	3: {
		id: 3,
		userId: 32,
		name: "Jose Cuervo",
		phoneNumber: "8184492522",
		type: "Locksmith",
		commissionRate: "14",
		notes: "This is the third technician haha",
	},
	4: {
		id: 4,
		userId: 32,
		name: "Donnie Brasco",
		phoneNumber: "8184892556",
		type: "Locksmith",
		commissionRate: "42",
		notes: "This is the fourth technician!!",
	},
	5: {
		id: 5,
		userId: 32,
		name: "Judge Judy",
		phoneNumber: "8184492522",
		type: "Locksmith",
		commissionRate: "11",
		notes: "This is the third technician haha",
	},
	6: {
		id: 6,
		userId: 32,
		name: "Mickey Mouse",
		phoneNumber: "8184896556",
		type: "Locksmith",
		commissionRate: "13",
		notes: "This is the fourth technician!!",
	},
}

// Resetting state
INITIAL_STATE = {}

const technicianReducer = (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case FETCH_TECHNICIAN:
			return { ...state, [payload._id]: [payload] }

		case FETCH_TECHNICIANS:
			return { ...state, ..._.mapKeys(payload, "_id") }

		case CREATE_TECHNICIAN:
			return { ...state, [payload._id]: { ...payload } }

		case DELETE_TECHNICIAN:
			return _.omit(state, payload)

		case UPDATE_TECHNICIAN:
			return { ...state, [payload._id]: { ...payload } }

		default:
			return state
	}
}

export default technicianReducer;
