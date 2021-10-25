import _ from "lodash"
import {
	ACCEPT_JOB,
	REJECT_JOB,
	ASSIGN_TECHNICIAN,
	FETCH_JOBS,
	FETCH_JOB,
	FORCE_TECHNICIAN_CONFIRMATION,
	UPDATE_COMMISSION_RATE,
	UPDATE_JOB_VALUE,
	UPDATE_JOB_DESCRIPTION,
} from "../actions/actionTypes"
import {
	JOB_ACCEPTED,
	JOB_RECEIVED,
	TECHNICIAN_ACCEPTED,
	TECHNICIAN_REJECTED,
} from "../../Utility/JobUtils"
import { TECHNICIAN_PENDING } from "../../Utility/JobUtils"

/*

Every job should have the following properties:
job : {
    id, -> the id of the job in our system. I'll have to create a unique one that's a hash 
    jobId, -> the id provided by the lead generator
    leadGeneratorId,
	jobValue,
    timeReceived,
    status,
    jobNotes,
    alteredJobNotes -> is NULL unless the dispatcher altered the original jobNotes before forwarding to the technician
}

*/

let INITIAL_STATE = {
	1: {
		_id: 1,
		timeReceived: "Feb 5 4:15PM",
		jobId: "37258",
		leadGenerator: 1,
		jobValue: "200",
		description:
			"@Job ID: 37258 Name: John Smith Phone: 8888888888 Address: 1234 Superior Dr. Los Angeles, 90210 Rate: $199 Job Type: Car Lockout Mercedes 2014",
		updatedDescription: "",
		status: JOB_RECEIVED,
		technician: null,
		technicianResponse: 'NO_RESPONSE',
	},
	2: {
		_id: 2,
		timeReceived: "Feb 5 4:15PM",
		jobId: "37258",
		leadGenerator: 2,
		jobValue: "200",
		description:
			"@Job ID: 37258 Name: John Smith Phone: 8888888888 Address: 1234 Superior Dr. Los Angeles, 90210 Rate: $199 Job Type: Car Lockout Mercedes 2014",
		updatedDescription: "",
		status: JOB_RECEIVED,
		technician: { id: 1, name: "Edon Cohanim", commissionRate: "24" },
		technicianResponse: TECHNICIAN_REJECTED,
	},
	3: {
		_id: 3,
		timeReceived: "Feb 5 4:15PM",
		jobId: "37258",
		leadGenerator: 2,
		jobValue: null,
		description:
			"@Job ID: 37258 Name: John Smith Phone: 8888888888 Address: 1234 Superior Dr. Los Angeles, 90210 Rate: $199 Job Type: Car Lockout Mercedes 2014",
		updatedDescription: "",
		status: JOB_ACCEPTED,
		technician: { id: 1, name: "Edon Cohanim", commissionRate: "24" },
		technicianResponse: TECHNICIAN_PENDING,
	},
	4: {
		_id: 4,
		timeReceived: "Feb 5 4:35PM",
		jobId: "37254",
		leadGenerator: 1,
		jobValue: "200",
		description:
			"@Job ID: 37258 Name: Johnfff Smith Phone: 8888888888 Address: 1234 Superior Dr. Los Angeles, 90210 Rate: $199 Job Type: Car Lockout Mercedes 2014",
		updatedDescription: "",
		status: JOB_ACCEPTED,
		technician: { id: 3, name: "Jose Cuervo", commissionRate: "14" },
		technicianResponse: TECHNICIAN_ACCEPTED,
	},
}



// Resetting state
INITIAL_STATE = {};




const jobReducer = (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case FETCH_JOBS:
			return { ...state, ..._.mapKeys(payload, "_id") }

		case FETCH_JOB:
			return { ...state, [payload._id]: payload }

		case ACCEPT_JOB:
			return { ...state, [payload._id]: payload }

		case REJECT_JOB:
			return { ...state, [payload._id]: payload }

		case ASSIGN_TECHNICIAN:
			return { ...state, [payload._id]: payload }

		case FORCE_TECHNICIAN_CONFIRMATION:
			return { ...state, [payload._id]: payload }

		case UPDATE_JOB_DESCRIPTION:
			return { ...state, [payload._id]: payload }

		case UPDATE_JOB_VALUE:
			return { ...state, [payload._id]: payload }

		case UPDATE_COMMISSION_RATE:
			return { ...state, [payload._id]: payload }

		default:
			return state
	}
}

export default jobReducer;
