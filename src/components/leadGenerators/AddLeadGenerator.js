import React from "react"
import { connect } from "react-redux"
import LeadGeneratorForm from "../../forms/LeadGeneratorForm"
import { createLeadGenerator } from "../../redux/actions/leadGeneratorActions"

const AddLeadGenerator = (props) => {
	const onSubmit = (formValues) => {
		props.createLeadGenerator(formValues)
	}

	return (
		<LeadGeneratorForm
			formTitle={"Add Lead Generator 📥"}
			onSubmit={onSubmit}
			onSubmitLabel={"Add Lead Generator"}
		/>
	)
}

export default connect(null, { createLeadGenerator })(AddLeadGenerator)
