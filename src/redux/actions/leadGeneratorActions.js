import axios from "axios"
import _ from "lodash"
import history from "../../history"
import { buildQueryString } from "../../Utility/UrlUtils"
import {
	CREATE_LEADGENERATOR,
	DELETE_LEADGENERATOR,
	UPDATE_LEADGENERATOR,
	FETCH_LEADGENERATOR,
	FETCH_LEADGENERATORS,
} from "./actionTypes"

export const createLeadGenerator =
	(formValues) => async (dispatch, getState) => {
		formValues.user = getState().auth.userInfo._id

		const response = await axios.post(
			`${process.env.REACT_APP_API_SERVER}/leadgenerator/add`,
			formValues
		)

		let leadGenerator = response.data

		dispatch({
			type: CREATE_LEADGENERATOR,
			payload: leadGenerator,
		})

		let destination = buildQueryString("/dashboard/leadgenerators", {
			notification: "success",
			message: "add",
		})

		history.push(destination)
	}

export const updateLeadGenerator =
	(leadGeneratorId, formValues) => async (dispatch, getState) => {
		let userId = getState().auth.userInfo._id
		formValues.userId = userId

		const response = await axios.patch(
			`${process.env.REACT_APP_API_SERVER}/leadGenerator/edit/${leadGeneratorId}`,
			formValues
		)

		let updatedLeadGenerator = response.data

		dispatch({
			type: UPDATE_LEADGENERATOR,
			payload: updatedLeadGenerator,
		})

		let destination = buildQueryString("/dashboard/leadgenerators", {
			notification: "success",
			message: "edit",
		})

		history.push(destination)
	}

export const deleteLeadGenerator = (leadGeneratorId) => async (dispatch, getState) => {

    let userId = getState().auth.userInfo._id

    await axios.delete(
		`${process.env.REACT_APP_API_SERVER}/leadgenerator/delete/${leadGeneratorId}`,
		{params: {userId}}
	)


	dispatch({
		type: DELETE_LEADGENERATOR,
		payload: leadGeneratorId
	})

    let destination = buildQueryString("/dashboard/leadgenerators", {
		notification: "success",
		message: "delete",
	})

	history.push(destination)

}

export const fetchLeadGenerators = () => async (dispatch, getState) => {
	let userId = getState().auth.userInfo._id

	const response = await axios.get(
		`${process.env.REACT_APP_API_SERVER}/leadgenerator/fetchleadgenerators`,
		{ params: { userId } }
	)

	let leadGenerators = _.mapKeys(response.data, "_id")


	dispatch({
		type: FETCH_LEADGENERATORS,
		payload: leadGenerators
	})
}

export const fetchLeadGenerator = (leadGeneratorId) => async (dispatch, getState) => {
	const response = await axios.get(
		`${process.env.REACT_APP_API_SERVER}/leadgenerator/fetchleadgenerator/${leadGeneratorId}`,
		{params: {userId: getState().auth.userInfo._id}}
	)

	let leadGenerator = response.data

	dispatch({
		type: FETCH_LEADGENERATOR,
		payload: leadGenerator
	})
};