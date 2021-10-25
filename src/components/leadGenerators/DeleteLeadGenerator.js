import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { deleteLeadGenerator, fetchLeadGenerator } from '../../redux/actions/leadGeneratorActions';
import { formatPhoneNumber } from '../../Utility/PhoneUtils';
import SimpleModal from '../Modals/SimpleModal';


class DeleteLeadGenerator extends Component {

    componentDidMount() {

        // If this technician wasn't loaded in our redux store
        if (!this.props.leadGenerator) {

            // Fetch this technician
            this.props.fetchLeadGenerator(this.props.match.params._id)
        }
    }

    renderModalBody() {
        if (this.props.leadGenerator) {
            return (
                <>
                    <div className="mb-3">Are you sure you want to delete this lead generator?</div>
                    <div className="alert alert-secondary">
                        <div><span className="font-weight-bold">Name:</span> {this.props.leadGenerator.name}</div>
                        <div><span className="font-weight-bold">Phone Number:</span> {formatPhoneNumber(this.props.leadGenerator.phoneNumber)}</div>
                        <div><span className="font-weight-bold">Fee:</span> ${this.props.leadGenerator.fee}</div>
                        <div><span className="font-weight-bold">Notes:</span> {this.props.leadGenerator.notes}</div>
                    </div>
                </>
            )
        }
    }


    render() {

        // If the user doesn't own the leadGenerator
        if (!this.props.leadGenerator || this.props.leadGenerator.user !== this.props.currentUserId) {

            // Return to the redirect page
            return <Redirect to="/dashboard/joblog" />
        }


        else {

            return (

                <SimpleModal
                    title="Delete Lead Generator"
                    body={this.renderModalBody()}
                    onSubmitLabel="Delete Lead Generator"
                    onSubmitVariant="danger"
                    onSubmit={() => this.props.deleteLeadGenerator(this.props.leadGenerator._id)}
                    onCloseUrl="/dashboard/leadgenerators"
                />

            )
        }
    }
}

const mapStateToProps = (state, ownProps) => ({
    leadGenerator: state.leadGenerators[ownProps.match.params._id],
    currentUserId: state.auth._id
})



export default connect(mapStateToProps, { fetchLeadGenerator, deleteLeadGenerator })(DeleteLeadGenerator)
