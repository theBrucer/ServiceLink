import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import SimpleModal from "../../Modals/SimpleModal";
import { fetchJob, assignTechnician } from "../../../redux/actions/jobActions";
// import { Form } from "react-final-form";
import SelectTechnician from "./SelectTechnician";
import JobInformation from "./JobInformation";

class AssignTechnician extends Component {
    state = {
        selectedTechnicianId: null
    };

    componentDidMount() {
        // If the job is not loaded in the app's state
        if (!this.props.job) {
            // Make an API call to fetch the job
            this.props.fetchJob(this.props.match.params._id);
        }

        this.setState({
            jobDescription: this.props.job.description,

            // If a technician had already been assigned for this job, indicated
            // that they are selected (this would happen when the dispatcher wants to reassign
            // a job if the dispatcher hadn't responded yet)
            selectedTechnicianId: this.props.job.technician
                ? this.props.job.technician
                : null,
        });
    }

    setSelectedTechnician = (technicianId) => {
        this.setState({selectedTechnicianId: technicianId})
    }




    renderModalBody = () => {

        return (
            <div>
                <Row>
                    <Col>
                        {/* Retrieve the updated job message
                            from this component (if there is one)
                        */}
                        <JobInformation
                            job={this.props.job}
                            />
                    </Col>
                    <Col>
                        {/* Retrieve the selected technician
                            from this component
                        */}
                        <SelectTechnician
                            setSelectedTechnician={this.setSelectedTechnician}
                            selectedTechnicianId={this.state.selectedTechnicianId}
                            technicianResponse={this.props.job.technicianResponse}
                            assignedTechnician={this.props.job.technician}
                        />
                    </Col>
                </Row>
            </div>
        );
    };

    render() {

        return (
            <div>
                <SimpleModal
                    title="Assign a Technician"
                    dialogClassName="modal-90w" // Passes down a class to the Modal, allowing to modify it's styling
                    body={this.renderModalBody()}
                    onSubmitLabel={
                        // If this technician was already assigned, updated button
                        // to "Resend"
                        this.props.job.technician !== null
                        && this.props.job.technician === this.state.selectedTechnicianId
                        ? "Re-send Job to Technician" : "Send Job to Technician"
                    }
                    onSubmitVariant={this.props.job.technician !== null
                        && this.props.job.technician === this.state.selectedTechnicianId
                        ? "warning" : undefined
                    }
                    cancelButtonLabel="Close"
                    onSubmit={() =>
                        this.props.assignTechnician(
                            this.state.selectedTechnicianId,
                            this.props.job._id
                        )
                    }
                    onCloseUrl="/dashboard/joblog"
                    submitButtonDisabled={this.state.selectedTechnicianId === null}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    job: state.jobs[ownProps.match.params._id],
});

export default connect(mapStateToProps, {
    fetchJob,
    assignTechnician,
})(AssignTechnician);
