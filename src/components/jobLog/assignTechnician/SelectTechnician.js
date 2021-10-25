import React, { Component } from "react"
import { Alert, Button, Form, Col, InputGroup } from "react-bootstrap"
import { connect } from "react-redux"
import { fetchTechnicians } from "../../../redux/actions/technicianActions"
import _ from "lodash"
import { Search, XCircle } from "react-bootstrap-icons"
import { TECHNICIAN_REJECTED } from "../../../Utility/JobUtils"

export class SelectTechnician extends Component {


	componentDidMount() {

		// If technicians aren't in the redux store

		// Fetch
		this.props.fetchTechnicians()
	}


	state = {
		filterTerms: "",
	}

	renderTechnicians = () => {
		return this.filterTechnicians(
			_.values(this.props.technicians),
			this.state.filterTerms
		).map((technician) => {
			
            // If the displayed technician is selected, the currently assigned technician is equal to this technician and the technician has rejected
			// the job, then display this with the "danger" bootstrap styling (red)



			if (
				this.props.selectedTechnicianId === technician._id &&
				this.props.technicianResponse === TECHNICIAN_REJECTED &&
				this.props.selectedTechnicianId ===
					this.props.assignedTechnician._id
			) {
				return (
					<div key={technician._id}>
						<Alert variant="danger" className="px-1 py-2 mb-1">
							{this.renderSelectButton(technician._id)}
							{technician.name} - {technician.phoneNumber} -{" "}
							{technician.notes}
						</Alert>
						<hr className="my-1" />
					</div>
				)
			}

			// If the displayed technician is selected, and has not rejected the job, show a successful assign button
			else if (this.props.selectedTechnicianId === technician._id) {
				return (
					<div key={technician._id}>
						<Alert variant="success" className="px-1 py-2 mb-1">
							{this.renderSelectButton(technician._id)}
                            {technician.name} - {technician.phoneNumber} -{" "}
							{technician.notes}
						</Alert>
						<hr className="my-1" />
					</div>
				)
			}

			return (
				<div key={technician._id}>
					{this.renderSelectButton(technician._id)}
                    {technician.name} - {technician.phoneNumber} -{" "}
					{technician.notes}
					<hr className="my-1" />
				</div>
			)
		})
	}

	filterTechnicians = (technicians, filterTerms) => {
		// If there are no filter terms
		if (filterTerms === "") {
			// Return and display all the technicians
			return technicians
		}

		return technicians.filter((technician) => {
			// Create a string containing all the technician's information (name phone number and notes)
			let technicianInfo = `${technician.name} ${technician.phoneNumber} ${technician.notes}`

			// If the technician's info contains the search terms then display the technician
			// OR if the technician is the selected technician - make sure to show them
			return (
				technicianInfo
					.toLowerCase()
					.includes(this.state.filterTerms.toLowerCase()) ||
				technician._id === this.props.selectedTechnicianId
			)
		})
	}

	renderSelectButton = (technicianId) => {

		// If the selected technician matches the one in the array AND this technician rejected the job
		 if (
            this.props.selectedTechnicianId === technicianId &&
			this.props.technicianResponse === TECHNICIAN_REJECTED &&
			this.props.selectedTechnicianId === this.props.assignedTechnician._id
            ) {
                return (
                    <Button className="ml-1 mr-3" variant="danger" size="sm">
					Rejected ⓧ
				</Button>
			)
		}
        // If the selected technician matches the one in the array AND this technician has NOT rejected the job
        else if (
            this.props.selectedTechnicianId === technicianId
        ) {
            return (
                <Button className="ml-1 mr-3" variant="success" size="sm">
                    Assigned ✓
                </Button>
            )
        }

		return (
			<Button
				className="ml-1 mr-3"
				variant="secondary"
				size="sm"
				onClick={() => this.props.setSelectedTechnician(technicianId)}
			>
				Assign
			</Button>
		)
	}

	render() {

		return (
			<>
				<div className="mb-3 text-center font-weight-bold lead">
					Select a technician to assign the job: <br />
					<small className="text-secondary">
						An SMS with the{" "}
						<strong>
							<u>job description</u>
						</strong>{" "}
						will be sent to the assigned technician
					</small>
				</div>
				<Form.Row>
					<Form.Group as={Col}>
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text>
									<Search icon="search" />
								</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								type="text"
								placeholder="Filter by name, phone, or notes"
								value={this.state.filterTerms}
								onChange={(e) =>
									this.setState({
										filterTerms: e.target.value,
									})
								}
							/>
							<XCircle
								// Clicking on the x-circle will clear the filterTerms
								onClick={() =>
									this.setState({ filterTerms: "" })
								}
								// Hide the circle if there are no filterTerms
								className={`text-secondary ${
									!this.state.filterTerms
										? "d-none"
										: undefined
								}`}
								// Style the circle to fit in the search input
								style={{
									position: "absolute",
									right: "10px",
									top: "10px",
									fontSize: "1.2rem",
									cursor: "pointer",
									zIndex: "44",
								}}
							/>
						</InputGroup>
					</Form.Group>
				</Form.Row>
				<div className="overflow-auto" style={{ height: "315px" }}>
					{this.renderTechnicians()}
					<small className="d-block text-center my-3 text-secondary">
						(End)
					</small>
				</div>
			</>
		)
	}
}

const mapStateToProps = (state) => ({
	technicians: state.technicians,
})

export default connect(mapStateToProps, { fetchTechnicians })(SelectTechnician)
