import React from "react"
import { createTechnician } from '../../redux/actions/technicianActions'
import { connect } from "react-redux"
import TechnicianForm from "../../forms/TechnicianForm"

// This Modal is for displaying information and two actions.
// For creating a Form modal, refer to the FormModal.js

const AddTechnician = (props) => {

	const onSubmit = (formValues) => {
		props.createTechnician(formValues)
	}

	console.log("Loading this")
	
	return (
		<TechnicianForm
			formTitle={"Add Technician 👨🏻‍🔧👩🏻‍🔧"}
			onSubmit={onSubmit}
			onSubmitLabel={"Add Technician"}
		/>
	)
}

export default connect(null, {createTechnician})(AddTechnician)
