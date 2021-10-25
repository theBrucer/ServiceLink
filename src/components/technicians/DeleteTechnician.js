import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTechnician, fetchTechnician } from '../../redux/actions/technicianActions';
import { formatPhoneNumber } from '../../Utility/PhoneUtils';
import SimpleModal from '../Modals/SimpleModal';


class DeleteTechnician extends Component {

    componentDidMount() {

        // If this technician wasn't loaded in our redux store
        if (!this.props.technician) {

            // Fetch this technician
            this.props.fetchTechnician(this.props.match.params._id)
        }
    }

    renderModalBody() {
        if (this.props.technician) {
            return (
                <>
                    <div className="mb-3">Are you sure you want to delete this technician?</div>
                    <div className="alert alert-secondary">
                        <div><span className="font-weight-bold">Name:</span> {this.props.technician.name}</div>
                        <div><span className="font-weight-bold">Phone Number:</span> {formatPhoneNumber(this.props.technician.phoneNumber)}</div>
                        <div><span className="font-weight-bold">Commission Rate:</span> {this.props.technician.commissionRate}%</div>
                        <div><span className="font-weight-bold">Notes:</span> {this.props.technician.notes}</div>
                    </div>
                </>
            )
        }
    }


    render() {

        // If the user doesn't own the technician
        // if (!this.props.technician || this.props.technician.userId !== this.props.currentUserId) {

        //     // Return to the redirect page
        //     return <Redirect to="/dashboard/joblog" />
        // }

        if (false) {
            return <div></div>
        }
        else {

            return (

                <SimpleModal
                    title="Delete Technician"
                    body={this.renderModalBody()}
                    onSubmitLabel="Delete Technician"
                    onSubmitVariant="danger"
                    onSubmit={() => this.props.deleteTechnician(this.props.technician._id)}
                    onCloseUrl="/dashboard/technicians"
                />

            )
        }
    }
}

const mapStateToProps = (state, ownProps) => ({
    technician: state.technicians[ownProps.match.params._id],
    currentUserId: state.auth.userId
})



export default connect(mapStateToProps, { fetchTechnician, deleteTechnician })(DeleteTechnician)
