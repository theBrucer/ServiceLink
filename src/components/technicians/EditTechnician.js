import React, { Component } from 'react'
import { connect } from 'react-redux'
import TechnicianForm from '../../forms/TechnicianForm'
import { updateTechnician, fetchTechnician } from '../../redux/actions/technicianActions'


class EditTechnician extends Component {

    componentDidMount() {
        // If the technician is not loaded in our Redux store
        if (!this.props.technician) {
            // Go fetch the technician
            this.props.fetchTechnician(this.props.match.params._id)
        }
    }

    onSubmit = (formValues) => {
        console.log("Submitting this", formValues);

        this.props.updateTechnician(this.props.match.params._id, formValues)
    }

    render() {

        return (
            <TechnicianForm 
                formTitle={"Edit Technician 👨🏻‍🔧👩🏻‍🔧"}
                onSubmit={this.onSubmit}
                onSubmitLabel={"Update Technician"}
                initialValues={this.props.technician}
            />
        )
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        technician: state.technicians[ownProps.match.params._id],
        currentUserId: state.auth.userId
    }
}


export default connect(mapStateToProps, { fetchTechnician, updateTechnician })(EditTechnician)
