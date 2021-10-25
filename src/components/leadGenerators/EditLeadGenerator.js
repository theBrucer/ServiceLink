import React, { Component } from "react"
import { connect } from "react-redux"
import LeadGeneratorForm from "../../forms/LeadGeneratorForm"
import {
	updateLeadGenerator,
	fetchLeadGenerator,
} from "../../redux/actions/leadGeneratorActions"

class EditLeadGenerator extends Component {
	componentDidMount() {
		// If the lead generator is not loaded in our Redux store
		if (!this.props.leadGenerator) {
			// Go fetch the lead generator
			this.props.fetchLeadGenerator(this.props.match.params._id)
		}
	}

	onSubmit = (formValues) => {
		this.props.updateLeadGenerator(this.props.match.params._id, formValues)
	}

	render() {
		return (
			<LeadGeneratorForm
				formTitle={"Edit Lead Generator 📥"}
				onSubmit={this.onSubmit}
				onSubmitLabel={"Update Lead Generator"}
				initialValues={this.props.leadGenerator}
			/>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		leadGenerator: state.leadGenerators[ownProps.match.params._id],
		currentUserId: state.auth._id,
	}
}

export default connect(mapStateToProps, {
	fetchLeadGenerator,
	updateLeadGenerator,
})(EditLeadGenerator)
