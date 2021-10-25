import React, { Component } from "react"
import { Alert, Badge, Button} from "react-bootstrap"
import {
	InfoCircle,
	PencilFill,
	QuestionCircle,
} from "react-bootstrap-icons"
import { connect } from "react-redux"
import { forceTechnicianConfirmed } from "../../../redux/actions/jobActions"
import {
	TECHNICIAN_PENDING,
	TECHNICIAN_REJECTED,
} from "../../../Utility/JobUtils"
import { Tooltip } from "../../../Utility/GeneralUtils"
import EditCommissionRate from "./EditCommissionRate"
import EditJobValue from "./EditJobValue"
import EditJobDescription from "./EditJobDescription"
import { convertDateStampToString } from "../../../Utility/TimeUtils"


export class JobInformation extends Component {
	state = {

		// Set the functionality of editing the job to off by default
		canEditJobDescription: false,

		// Set the functionality of editing the commission rate off by default
		canEditCommissionRate: false,
		
        // Set the functionality of editing the job's value off by default
		canEditJobValue: false
	}

	// Toggle the description editor on/off
	toggleDescriptionEditor = () => {
		this.setState({
			canEditJobDescription: !this.state.canEditJobDescription,
		})
	}

    // Toggle the commission rate editor on/off
	toggleCommissionRateEditor = () => {
		this.setState({ canEditCommissionRate: !this.state.canEditCommissionRate })
	}
	
    // Toggle the job value editor on/off
    toggleJobValueEditor = () => {
		this.setState({ canEditJobValue: !this.state.canEditJobValue })
	}


    renderJobDescription = () => {

        // If the updated job description is set, display it otherwise display the description
        let displayedJobDescription = this.props.job.updatedDescription || this.props.job.description;

        if(this.state.canEditJobDescription) {
            return (
                <EditJobDescription
                    toggleDescriptionEditor={this.toggleDescriptionEditor}
                    job={this.props.job}
                />
            )
        }
        else {
            return (
				<>
					<div className="mb-3">{displayedJobDescription}</div>
					<div className="text-center">
						<Button
							variant={"secondary"}
							onClick={() =>
								this.setState({ canEditJobDescription: true })
							}
						>
							Edit Job Description
						</Button>
						<br />
						<small className="text-center d-block mt-2">
							<InfoCircle
								style={{ verticalAlign: "-.180em" }}
								className="mr-1"
							/>
							You can edit the job description before sending it
							to the technician
						</small>
					</div>
				</>
			)
        }
    }

    
	renderEditValueButton = (action) => {
		return (
			<Badge
				size={"sm"}
				variant={"secondary"}
				className={"ml-1"}
				style={{ cursor: "pointer", verticalAlign: ".150em" }}
                onClick={() => action()}
			>
				Edit
				<PencilFill
					className={"ml-1"}
					style={{ verticalAlign: ".050em", fontSize: ".8em" }}
				/>
			</Badge>
		)
	}


	renderJobValue = (job) => {
    
        if(this.state.canEditJobValue) {
            return (
                <EditJobValue
                    jobId={job._id}
                    
                    // If job value is null, pass the value 0
                    jobValue={job.jobValue ? job.jobValue : 0}
                    toggleJobValueEditor={this.toggleJobValueEditor}
                />
            )
        }
        else {

            let jobValue = job.jobValue === null
            ? "N/A"
            : `$${job.jobValue}`;

            return (
                <> 
                    {jobValue} {this.renderEditValueButton(this.toggleJobValueEditor)}
                </>
            )
        }
    }


    renderCommissionRate = (job) => {

        let jobCommissionRate =
        // If the job has a commissionrate defined, display the job commission rate
        job.commissionRate
            ? `${job.commissionRate}%`
            : // If the job has a technician assigned display technician's commission rate
            job.technician
            ? `${job.technician.commissionRate}%`
            : // default, display N/A
              "N/A"



        if(this.state.canEditCommissionRate) {
            return (
                <EditCommissionRate
                    jobId={job._id}
                    commissionRate={jobCommissionRate.match(/\d+/)}
                    toggleCommissionRateEditor={this.toggleCommissionRateEditor}
                />
            )
        }
        else {
            return (
                <>
                {jobCommissionRate} {this.renderEditValueButton(this.toggleCommissionRateEditor)}
                </>
            )
        }
    };

	renderCommissionRateToolTip = () => {
		return (
			<Tooltip
				description="By default is equal to the technician's commission rate"
				place="top"
				type="dark"
				effect="solid"
				content={
					<QuestionCircle
						className="text-dark"
						style={{ verticalAlign: "-.100em", cursor: "pointer" }}
					/>
				}
			/>
		)
	}

    renderTechnicianStatus = (job) => {
		if (job.technician === null) {
			return (
				<Alert className="d-inline py-1 px-1" variant={"dark"}>
					No Technician Assigned
				</Alert>
			)
		} else if (
			job.technician !== null &&
			job.technicianResponse === TECHNICIAN_PENDING
		) {
			return (
				<span>
					<Alert className="d-inline py-1 px-1" variant={"warning"}>
						{job.technician.name} (Pending Response){" "}
					</Alert>
				</span>
			)
		} else if (
			job.technician !== null &&
			job.technicianResponse === TECHNICIAN_REJECTED
		) {
			return (
				<span>
					<Alert className="d-inline py-1 px-1" variant={"danger"}>
						{job.technician.name} rejected job{" "}
					</Alert>
				</span>
			)
		} else {
			return (
				<span>
					<Alert className="d-inline py-1 px-1" variant={"success"}>
						{this.props.technicianName} (Confirmed)
					</Alert>
				</span>
			)
		}
	}

    renderForceConfirmButton = (job) => {
		if (
			job.technician !== null &&
			job.technicianResponse === TECHNICIAN_PENDING
		) {
			return (
                <Tooltip
				description="Manually confirm a technician without having to wait for their response"
				place="top"
				type="dark"
				effect="solid"
				content={
				<Badge
					size={"sm"}
					variant={"secondary"}
					className={"ml-1"}
					style={{ cursor: "pointer", verticalAlign: ".150em" }}
					onClick={() => this.props.forceTechnicianConfirmed(job._id)}
				>
					Force confirm
				</Badge>}
                />
			)
		}
	};


	renderJobInformation = (job) => {

			
		let jobId = String(job._id).substring(0, 6);
		let timeReceived = convertDateStampToString(job.timeReceived)
		let jobStatus = job.status === null
		? "You haven't accepted this job yet"
		: "You have accepted this job";
		let leadGeneratorName = this.props.leadGeneratorName;
		let jobValue = this.renderJobValue(job);
		let commissionRate = this.renderCommissionRate(job);



		return (
			<div className="alert alert-secondary my-0">
				<div className="mb-3 text-center lead font-weight-bold">
					Job information:
					<hr className="mt-1" />
				</div>
				<div className="my-1">
					<span className="font-weight-bold text-underline">
						<u>Job ID:</u> &ensp;{" "}
					</span>
					{jobId}
				</div>
				<div className="my-1">
					<span className="font-weight-bold text-underline">
						<u>Received:</u> &ensp;{" "}
					</span>
					{timeReceived}
				</div>
				<div className="my-1">
					<span className="font-weight-bold text-underline">
						<u>Status:</u> &ensp;
					</span>
					{"  "}
					{jobStatus}
				</div>
				<div className="my-1">
					<span className="font-weight-bold text-underline">
						<u>Lead Generator:</u> &ensp;
					</span>
					{"  "}
					{leadGeneratorName}
				</div>
				<div className="my-1">
					<span className="font-weight-bold text-underline">
						<u>Job Value:</u> &ensp;
					</span>
					{"  "}
                    {jobValue}
				</div>
				<div className="my-1">
					<span className="font-weight-bold text-underline">
						<u>Commission Rate:</u>{" "}
						{this.renderCommissionRateToolTip()} &ensp;
					</span>
					{"  "}
                    {commissionRate}
				</div>
				<div className="my-2">
					<span className="font-weight-bold text-underline">
						<u>Technician:</u> &ensp;
					</span>
					{this.renderTechnicianStatus(job)}
                    {this.renderForceConfirmButton(job)}
				</div>

				

				<hr />
				<div>
					<div className="text-center font-weight-bold lead mb-1">
						Job Description:
					</div>
					<div className="mb-3">{this.renderJobDescription()}</div>
				</div>
			</div>
		)
	}

	render() {
		return <>{this.renderJobInformation(this.props.job)}</>
	}
}

const mapStateToProps = (state, ownProps) => ({
	technicianName: ownProps.job.technician ? state.technicians[ownProps.job.technician].name : "",
	leadGeneratorName: state.leadGenerators[ownProps.job.leadGenerator].name
})


export default connect(mapStateToProps, { forceTechnicianConfirmed })(JobInformation)
