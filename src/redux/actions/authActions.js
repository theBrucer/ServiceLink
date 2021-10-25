import history from "../../history"
import { buildQueryString } from "../../Utility/UrlUtils"
import {
	SIGN_IN,
	SIGN_UP,
	LOG_IN,
	EDIT_USER,
	FETCH_USER,
	APPLY_JOBLOG_FILTERS,
} from "./actionTypes"
import axios from "axios"
import { fetchLocalStorage, setLocalStorage } from "../../Utility/AuthUtils"

// For quick sign in during dev
export const signIn = (userId) => {
	return {
		type: SIGN_IN,
		payload: "User Id",
	}
}

export const logIn = (auth) => (dispatch) => {
	
	setLocalStorage(auth)
	
	dispatch({
		type: LOG_IN,
		payload: {
			...auth
		}
	})
}

export const signUp = (auth) => async (dispatch) => {
	
	setLocalStorage(auth)
	

	dispatch({
		type: SIGN_UP,
		payload: {
			...auth
		}
	})
}


// Fetches user details
export const fetchUser = () => async (dispatch) => {
	dispatch({
		type: FETCH_USER,
	})
}

export const editUser = (formValues) => async (dispatch, getState) => {
	console.log("form values are", formValues)

	const {auth} = getState(); 

	try {
		const response = await axios({
			method: "patch",
			url: `${process.env.REACT_APP_API_SERVER}/user/update/${
				auth.userInfo._id
			}`,
			data: formValues,
			headers: { Authorization: `Bearer ${auth.token}` },
		})

		console.log("Response for editing a user is", response)

		// const response = await axios.patch(
		// 	`${process.env.REACT_APP_API_SERVER}/user/update/${
		// 		auth._id
		// 	}`,
		// 	formValues,
		// 	{ headers: {"Authorization" : `Bearer ${auth.token}`}
		// )
	} catch (err) {
		console.log("Error is", err)
	}

	// Was the email updated in the form?
	let emailWasUpdated =
		auth.userInfo.userEmail !== formValues.userEmail ? true : false

	if (emailWasUpdated) {
		// If email was updated, changed the confirmed status to false
		formValues.userEmailConfirmed = false
	} else {
		// If the user email wasn't changed, keep it's confirmed status as is
		formValues.userEmailConfirmed = auth.userInfo.userEmailConfirmed
	}

	let {token, expiresAt, userInfo: userInfoLocalStorage} = fetchLocalStorage();
	let userInfo = {...userInfoLocalStorage, ...formValues}

	console.log("user info is", userInfo)

	localStorage.setItem('userInfo', JSON.stringify(userInfo));

	dispatch({
		type: EDIT_USER,
		payload: { token, expiresAt, userInfo },
	})

	let destination = buildQueryString("/dashboard/settings", {
		notification: "success",
		message: "updated",
	})

	history.push(destination)
}

export const applyJobLogFilters =
	(jobLogFilters) => async (dispatch) => {

		dispatch({
			type: APPLY_JOBLOG_FILTERS,
			payload: jobLogFilters
		})
	}
