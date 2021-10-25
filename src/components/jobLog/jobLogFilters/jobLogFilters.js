import React, { useState, useEffect } from "react"
import { Filter } from "react-bootstrap-icons"
// import {
// 	Accordion,
// 	AccordionItem,
// 	AccordionItemHeading,
// 	AccordionItemButton,
// 	AccordionItemPanel,
// } from "react-accessible-accordion"

import "./jobLogFilters.css"
import "react-accessible-accordion/dist/fancy-example.css"
import { Button, CloseButton, Container } from "react-bootstrap"
import { Field, Form } from "react-final-form"
import {
	ALL_JOBS,
	JOB_ACCEPTED,
	// JOB_REJECTED,
	NEWEST_FIRST,
	OLDEST_FIRST,
	// TECHNICIAN_ACCEPTED,
	// TECHNICIAN_PENDING,
	// TECHNICIAN_REJECTED,
} from "./FilterTypes"
import { connect } from "react-redux"
import { applyJobLogFilters } from "../../../redux/actions/authActions"

/* Component that renders a modal containing all the filters that can be applied 
    to the job log.

    Filters can be by:
    - Time frame (default is beginning of cycle starting Saturday early morning 00:00AM )
    - Technicians: displays jobs from a selected number of technicians, 1 or more
    - Lead Generators: displays jobs from a selected number of lead generators, 1 or more
    - Job status: show/hide jobs based on their status [REJECTED, ACCEPTED]
    - Technician response: show/hide jobs based on their status [REJECTED, ACCEPTED, PENDING]
    - Jobs can be sorted by: Newest jobs first [default] / oldest jobs first
    - # of jobs shown on each page: 20 / 50 / 100

    ** Make sure there is pagination, figure that out from mongodb on how to pull separate pages
*/

const JobLogFilters = (props) => {
	const [isDisplayed, setIsDisplayed] = useState(props.display)

	useEffect(() => {
		if (props.display) {
			setIsDisplayed(true)
		} else {
			setIsDisplayed(false)
		}
	}, [props.display])

	const renderInput = ({ input, label }) => {
		let cursorPointer = { cursor: "pointer" }

		if (input.type === "radio") {
			return (
				<div className="form-check">
					<label className="form-check-label" style={cursorPointer}>
						<input className="form-check-input" {...input} />
						{label}
					</label>
				</div>
			)
		} else if (input.type === "checkbox") {
			return (
				<div className="form-check">
					<label className="form-check-label" style={cursorPointer}>
						<input className="form-check-input" {...input} />
						{label}
					</label>
				</div>
			)
		} else {
			return (
				<div className="form-check">
					<label className="form-check-label" style={cursorPointer}>
						{label}
					</label>
					<input className="form-check-input" {...input} />
				</div>
			)
		}
	}

	const renderCancelButton = () => {
		return (
			<Button variant="secondary" onClick={props.toggleFilters}>
				Cancel
			</Button>
		)
	}

	const onSubmit = (formValues) => {

		// Submit the new job filters and hide the side tab
		props.applyJobLogFilters(formValues).then(() => props.toggleFilters())
	}

	const renderBody = () => {
		return (
			<Container className="mt-3 px-4">
				<CloseButton onClick={props.toggleFilters} />
				<h4 className="text-center">
					Job Log Filters{" "}
					<Filter style={{ verticalAlign: "-.200em" }} />
				</h4>
				<Form
					onSubmit={onSubmit}
					initialValues={props.jobLogFilters}
					render={(props) => (
						<form
							className="mt-4 h-100"
							onSubmit={props.handleSubmit}
						>
							{/* Sort Jobs By */}

							<div className="form-group border shadow-sm rounded p-3">
								<label className="h5">Sort jobs by</label>

								<Field
									label="Newest first"
									name="sortBy"
									type="radio"
									value={NEWEST_FIRST}
									component={renderInput}
								/>

								<Field
									label="Oldest first"
									name="sortBy"
									type="radio"
									value={OLDEST_FIRST}
									component={renderInput}
								/>
							</div>

							{/* Job Status */}
							<div className="form-group border shadow-sm rounded p-3">
								<label className="h5">
									Filter jobs by status
								</label>

								<Field
									label="Show all jobs"
									name="jobStatus"
									type="radio"
									value={ALL_JOBS}
									component={renderInput}
								/>
								<Field
									label="Hide jobs you rejected"
									name="jobStatus"
									type="radio"
									value={JOB_ACCEPTED}
									component={renderInput}
								/>
								{/* <Field
									label="Jobs you've rejected"
									name="jobStatus"
									type="radio"
									value={JOB_REJECTED}
									component={renderInput}
								/> */}
							</div>

							{/* <Field
								label="Hide jobs you rejected"
								name="jobStatus"
								type="date"
								value={JOB_ACCEPTED}
								component={renderInput}
							/> */}

							{/* TODO -> implement more filter options */}
							{/* <div className="form-group border shadow-sm rounded p-3">
								<label className="h5">
									Filter by technician's response
								</label>

								<Field
									label="Technician pending"
									name="jobStatus"
									type="checkbox"
									value={TECHNICIAN_PENDING}
									component={renderInput}
								/>
								<Field
									label="Technician accepted"
									name="jobStatus"
									type="checkbox"
									value={TECHNICIAN_ACCEPTED}
									component={renderInput}
								/>
								<Field
									label="Technician rejected"
									name="jobStatus"
									type="checkbox"
									value={TECHNICIAN_REJECTED}
									component={renderInput}
								/>
							</div> */}

							<hr />
							<div className="text-center">
								<Button
									variant="primary"
									type="submit"
									className="mr-2"
									disabled={props.pristine}
								>
									Apply Filters
								</Button>
								{renderCancelButton()}
							</div>
						</form>
					)}
				/>
			</Container>
		)
	}

	// By default hide the filters side menu
	let visibility = "hide"

	// If the isDisplayed value is true
	if (isDisplayed) {
		// Set visibility variable to show
		visibility = "show"
	}

	return (
		<>
			<div
				id="jobFilters"
				// add the appropriate class to show the menu
				className={`${visibility} bg-light shadow-lg`}
			>
				{renderBody()}
			</div>
			<div
				id="overlay"
				className={`${visibility}`}
				onClick={props.toggleFilters}
			></div>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		jobLogFilters: state.auth.userInfo.jobLogFilters
	}
}

export default connect(mapStateToProps, { applyJobLogFilters })(JobLogFilters)
