import history from "../../history"
// import { buildQueryString } from '../../Utility/UrlUtils';
import {
	ACCEPT_JOB,
	ASSIGN_TECHNICIAN,
	FETCH_JOBS,
	FETCH_JOB,
	FORCE_TECHNICIAN_CONFIRMATION,
	UPDATE_COMMISSION_RATE,
	UPDATE_JOB_VALUE,
	UPDATE_JOB_DESCRIPTION,
} from "./actionTypes"
import axios from "axios"
import _ from "lodash"

// Updates the status of a job to "JOB ACCEPTED"
// Sends a confirmation text to the lead generator <-- ask Edon what exactly this comprises
export const acceptJob = (job) => async (dispatch, getState) => {
	// This is when we make an API call to send a confirmation text to the lead generator

	let fromPhoneNumber = getState().auth.userInfo.twilioPhoneNumber
	let toPhoneNumber = getState().leadGenerators[job.leadGenerator].phoneNumber
	let userId = getState().auth.userInfo._id

	let jobInformation = {
		fromPhoneNumber,
		toPhoneNumber,
		userId,
	}

	const response = await axios.patch(
		`${process.env.REACT_APP_API_SERVER}/job/accept/${job._id}`,
		jobInformation
	)

	const updatedJob = response.data

	dispatch({
		type: ACCEPT_JOB,
		payload: updatedJob,
	})
}

// Updates the status of a job to "JOB REJECTED"
// Sends a rejection text to the lead generator <-- Ask Edon
export const rejectJob = (job) => async (dispatch, getState) => {
	// This is when we make an API call to send a confirmation text to the lead generator

	let fromPhoneNumber = getState().auth.userInfo.twilioPhoneNumber
	let toPhoneNumber = getState().leadGenerators[job.leadGenerator].phoneNumber
	let userId = getState().auth.userInfo._id

	let jobInformation = {
		fromPhoneNumber,
		toPhoneNumber,
		userId,
	}

	const response = await axios.patch(
		`${process.env.REACT_APP_API_SERVER}/job/reject/${job._id}`,
		jobInformation
	)

	const updatedJob = response.data

	dispatch({
		type: ACCEPT_JOB,
		payload: updatedJob,
	})
}

// Set the default message to the default job body. If it was changed, pass it through
// and use that to send the text message to the technician
// Job status is updated to "Awaiting Confirmation from Technician {Name of Technician})"
export const assignTechnician =
	(technicianId, jobId) => async (dispatch, getState) => {
		// Create an updated job object to submit to the database

		/*
            Information I need for sending a job:
            - Job description
            - Technician's information,
                - Technician ID -> assign technician to job
                    (only if technician accepts the job do you assign the job to the technician)
                - Technician's phone number to end the phone number
            - User (dispatcher's information):
                - phone number to send the job from
        */

		let jobInformation = {
			// All the job information
			...getState().jobs[jobId],
			technician: {
				_id: technicianId,
				phoneNumber: getState().technicians[technicianId].phoneNumber,
				commissionRate:
					getState().technicians[technicianId].commissionRate,
			},
			userTwilioPhoneNumber: getState().auth.userInfo.twilioPhoneNumber,
		}

		console.log("Job information I'm sending ", jobInformation)

		const response = await axios.post(
			`${process.env.REACT_APP_API_SERVER}/job/send/${technicianId}`,
			jobInformation
		)

		console.log("Response is", response)

		// Update the job in the reducer

		let updatedJob = response.data

		console.log("Update job is", updatedJob)

		// This is where we update the job's technician and status
		// to account for this new assignment

		dispatch({
			type: ASSIGN_TECHNICIAN,
			// payload: updatedJob
			payload: updatedJob,
		})

		// Navigate and display success toast notification
		history.push("/dashboard/joblog")
	}

// Retrieves all the jobs ->
// By default retrieves all unassigned jobs (regardless of when they were received),
// and all other jobs no matter their status from the beginning of the day (12:0AM)
export const fetchJobs = () => async (dispatch, getState) => {
	let userId = getState().auth.userInfo._id

	// Submitting a login request to axios
	const response = await axios.get(
		`${process.env.REACT_APP_API_SERVER}/job/fetchJobs`,
		{ params: { userId } }
	)

	const jobs = response.data

	if (!_.isEmpty(jobs)) {
		dispatch({
			type: FETCH_JOBS,
			payload: jobs,
		})
	}
}

// Retrieves a single job
export const fetchJob = (jobId) => {
	return async (dispatch, getState) => {
		const job = getState().jobs[jobId]

		dispatch({
			type: FETCH_JOB,
			payload: job,
		})
	}
}

export const updateJobValue =
	(jobId, jobValue) => async (dispatch, getState) => {
		// Send a PATCH request to the api to update the job value
		const response = await axios.patch(
			`${process.env.REACT_APP_API_SERVER}/job/updatevalue/${jobId}`,
			{ jobValue, userId: getState().auth._id }
		)

		// Temporary functionality using just redux
		const updatedJob = { ...response.data }

		dispatch({
			type: UPDATE_JOB_VALUE,
			payload: updatedJob,
		})
	}

export const updateCommissionRate =
	(jobId, commissionRate) => async (dispatch, getState) => {
		// Send a PATCH request to the api to update the commission rate value

		const response = await axios.patch(
			`${process.env.REACT_APP_API_SERVER}/job/updatecommissionrate/${jobId}`,
			{ userId: getState().auth.userInfo._id, commissionRate }
		)

		const updatedJob = { ...response.data }

		dispatch({
			type: UPDATE_COMMISSION_RATE,
			payload: updatedJob,
		})
	}

// This action is for when a dispatcher wants to confirm a job for a technician
// on their end (i.e. force confirm). For example, dispatcher reassigns
// a technician, the job was complete, but the technician forgot to confirm
// then the dispatcher can confirm the job for them.
export const forceTechnicianConfirmed =
	(jobId) => async (dispatch, getState) => {
		const response = await axios.patch(
			`${process.env.REACT_APP_API_SERVER}/job/forcetechnicianconfirmation/${jobId}`,
			{ userId: getState().auth.userInfo._id }
		)

		const updatedJob = { ...response.data }

		dispatch({
			type: FORCE_TECHNICIAN_CONFIRMATION,
			payload: updatedJob,
		})
	}

export const updateJobDescription =
	(jobId, updatedDescription) => async (dispatch, getState) => {
		console.log("Updated job description is", updatedDescription)

		// Send a PATCH request to the api to update the job value

		const response = await axios.patch(
			`${process.env.REACT_APP_API_SERVER}/job/updatedescription/${jobId}`,
			{ userId: getState().auth.userInfo._id, updatedDescription }
		)

		const updatedJob = { ...response.data }

		dispatch({
			type: UPDATE_JOB_DESCRIPTION,
			payload: updatedJob,
		})
	}
