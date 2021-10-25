import axios from "axios"
import _ from "lodash"
import history from "../../history"
import { buildQueryString } from "../../Utility/UrlUtils"
import {
	CREATE_TECHNICIAN,
	DELETE_TECHNICIAN,
	UPDATE_TECHNICIAN,
	FETCH_TECHNICIAN,
	FETCH_TECHNICIANS,
} from "./actionTypes"

export const createTechnician = (formValues) => async (dispatch, getState) => {
	formValues.user = getState().auth.userInfo._id

	const response = await axios.post(
		`${process.env.REACT_APP_API_SERVER}/technician/add`,
		formValues
	)

    let technician = response.data;

	// Make sure to add jwt token and user ID to ensure authorization

	dispatch({
		type: CREATE_TECHNICIAN,
		payload: technician
	})

	let destination = buildQueryString("/dashboard/technicians", {
		notification: "success",
		message: "add",
	})

	history.push(destination)
}

export const updateTechnician =
	(technicianId, formValues) => async (dispatch, getState) => {

        let userId = getState().auth.userInfo._id        
        formValues.userId = userId

		const response = await axios.patch(
			`${process.env.REACT_APP_API_SERVER}/technician/edit/${technicianId}`,
			formValues
		)

        let updatedTechnician = response.data;

		dispatch({
			type: UPDATE_TECHNICIAN,
			payload: updatedTechnician
		})

		let destination = buildQueryString("/dashboard/technicians", {
			notification: "success",
			message: "edit",
		})

		history.push(destination)
	}

export const deleteTechnician = (technicianId) => async (dispatch, getState) => {

    let userId = getState().auth.userInfo._id

	await axios.delete(
		`${process.env.REACT_APP_API_SERVER}/technician/delete/${technicianId}`,
		{params: {userId}}
	)

	dispatch({
		type: DELETE_TECHNICIAN,
		payload: technicianId
	})

	let destination = buildQueryString("/dashboard/technicians", {
		notification: "success",
		message: "delete",
	})

	history.push(destination)
}

// Fetch all technicians belonging to a given dispatcher
export const fetchTechnicians = () => async (dispatch, getState) => {
	let userId = getState().auth.userInfo._id

	const response = await axios.get(
		`${process.env.REACT_APP_API_SERVER}/technician/fetchtechnicians`,
		{ params: { userId } }
	)

	let technicians = _.mapKeys(response.data, "_id")


	dispatch({
		type: FETCH_TECHNICIANS,
		payload: technicians,
	})
}

// Fetch a specific technician belonging to a given dispatcher
export const fetchTechnician = (technicianId) => async (dispatch, getState) => {
	const response = await axios.get(
		`${process.env.REACT_APP_API_SERVER}/technician/fetchtechnician/${technicianId}`,
		{params: {userId: getState().auth.userInfo._id}}
	)

	let technician = response.data

	dispatch({
		type: FETCH_TECHNICIAN,
		payload: technician
	})
}
