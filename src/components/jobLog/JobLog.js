import React, { useEffect, useState } from "react"
import {
	Button,
	ButtonGroup,
	Container,
	Spinner,
	Table,
} from "react-bootstrap"
import { ArrowRepeat, Filter } from "react-bootstrap-icons"
import { connect } from "react-redux"
import BodyTitle from "../BodyTitle"
import TableResults from "../TableResults"
import { acceptJob, rejectJob, fetchJobs } from "../../redux/actions/jobActions"
import { fetchLeadGenerators } from "../../redux/actions/leadGeneratorActions"
import { fetchTechnicians } from "../../redux/actions/technicianActions"
import _ from "lodash"
import {
	JOB_ACCEPTED,
	JOB_RECEIVED,
	JOB_REJECTED,
	TECHNICIAN_ACCEPTED,
	TECHNICIAN_PENDING,
	TECHNICIAN_REJECTED,
} from "../../Utility/JobUtils"
import { Link } from "react-router-dom"
import PrivateRoute from "../PrivateRoute"
import AssignTechnician from "./assignTechnician/AssignTechnician"
import { concatenateText } from "../../Utility/TextUtils"
import "./JobLog.css"
import JobLogFilters from "./jobLogFilters/JobLogFilters"
import { ALL_JOBS, NEWEST_FIRST } from "./jobLogFilters/FilterTypes"
import { convertDateStampToString } from "../../Utility/TimeUtils"
import ExportToCsv from "./ExportToCsv"
import PaginationBar from "./PaginationBar"

const JobLog = (props) => {
	const [displayFilters, setDisplayFilters] = useState(false)
	const [fetchingJobs, setFetchingJobs] = useState(true)

	useEffect(() => {
		if (_.isEmpty(props.technicians)) {
			props.fetchTechnicians()
		}

		if (_.isEmpty(props.leadGenerators)) {
			props.fetchLeadGenerators()
		}

		// For now continually fetch jobs until web sockets are set up
		if (_.isEmpty(props.jobs)) {
			setTimeout(() => {
				props.fetchJobs().then(() => {
					setFetchingJobs(false)
				})
			}, 300)
		} else {
			setFetchingJobs(false)
		}
	}, [])

	const toggleFilters = () => {
		setDisplayFilters(!displayFilters)
	}

	// Render all the jobs within the table
	const renderJobs = (jobs) => {
		if (fetchingJobs) {
			return (
				<tr>
					<td colSpan="6" style={{ fontSize: "1.5rem" }}>
						<div className="text-center mx-auto">
							<Spinner
								animation="border"
								size="sm"
								className="mr-2 mb-1"
							/>
							Fetching your jobs...
						</div>
					</td>
				</tr>
			)
		}

		if (_.isEmpty(jobs)) {
			return (
				<tr>
					<td colSpan="6" style={{ fontSize: "1.5rem" }}>
						<div className="text-center mx-auto">
							No jobs to display
						</div>
					</td>
				</tr>
			)
		}

		let filteredJobs = applyFilters(_.values(jobs))

		return filteredJobs.map((job) => {
			// All details
			let timeReceived = convertDateStampToString(job.timeReceived)
			let jobId = String(job._id).substring(0, 6)
			let leadGeneratorName = props.leadGenerators[job.leadGenerator]
				? props.leadGenerators[job.leadGenerator].name
				: "Loading..."
			let jobDescription = job.updatedDescription
				? concatenateText(job.updatedDescription, 110)
				: concatenateText(job.description, 110)

			return (
				<tr key={job._id}>
					<td style={{ whiteSpace: "nowrap" }}>{timeReceived}</td>
					<td>{jobId}</td>
					<td>{leadGeneratorName}</td>
					<td>{jobDescription}</td>
					<td className="align-middle text-center">
						{renderTechnicianStatus(job)}
					</td>
					<td className="align-middle text-center">
						{renderActionButtons(job)}
					</td>
				</tr>
			)
		})
	}

	const applyFilters = (jobs) => {
		// Get the job filters based on user's preference
		let filters = props.jobLogFilters

		// sortBy -> default is smaller values at the top (for date, that means earlier jobs at the top)
		// By default, we sort for newest first, so higher values at the top (sort by -1)
		// If we want oldest at the top, sort by 1
		// If OLDEST_FIRST, leave 1 for descending
		// otherwise, OLDEST_FIRST for ascending
		let sortingMethod = filters.sortBy === NEWEST_FIRST ? -1 : 1

		// sort the job accordingly
		jobs = _.sortBy(jobs, [
			(job) => {
				return sortingMethod * Date.parse(job.timeReceived)
			},
		])

		// Step 2: Filter jobs
		return jobs.filter((job) => {
			// If they want all jobs, show it to them
			if (filters.jobStatus === ALL_JOBS) {
				return true
			}

			//
			else if (
				job.status === filters.jobStatus ||
				job.status === JOB_RECEIVED
			) {
				return true
			} else {
				return false
			}
		})
	}

	// Render the action buttons (Accept / Reject)
	const renderActionButtons = (job) => {
		// If the job has been accepted
		if (job.status === JOB_ACCEPTED) {
			return (
				<span
					className="font-weight-bold text-success h6"
					style={{ whiteSpace: "nowrap" }}
				>
					Accepted
				</span>
			)
		}
		// If the job has been rejected
		else if (job.status === JOB_REJECTED) {
			return (
				<span
					className="font-weight-bold text-danger h6"
					style={{ whiteSpace: "nowrap" }}
				>
					Rejected
				</span>
			)
		}

		// Job has been neither accepted nor rejected. Render the buttons
		else {
			return (
				<ButtonGroup size="sm">
					{/* <Button variant="secondary" style={{ whiteSpace: "nowrap" }}>Assign Technician</Button> */}
					<Button
						variant="success"
						onClick={() => props.acceptJob(job)}
					>
						Accept
					</Button>
					<Button
						variant="danger"
						onClick={() => props.rejectJob(job)}
					>
						Reject
					</Button>
				</ButtonGroup>
			)
		}
	}

	// Render the Technician status
	const renderTechnicianStatus = (job) => {
		let technicianName = props.technicians[job.technician]
			? props.technicians[job.technician].name
			: "Loading..."

		// If the job was rejected
		if (job.status === JOB_REJECTED) {
			return <span>Job was rejected</span>
		}

		// If the technician hasn't been assigned yet
		else if (job.technician === null) {
			return (
				<Link to={`/dashboard/joblog/assigntechnician/${job._id}`}>
					<Button
						size="sm"
						variant="secondary"
						style={{ whiteSpace: "nowrap" }}
					>
						Assign Technician
					</Button>
				</Link>
			)
		}

		// If technician had been assigned and accepted the job
		else if (
			job.technician !== null &&
			job.technicianResponse === TECHNICIAN_ACCEPTED
		) {
			return (
				<Link to={`/dashboard/joblog/assigntechnician/${job._id}`}>
					<Button
						size="sm"
						variant="outline-success"
						style={{ whiteSpace: "nowrap" }}
					>
						{/* Retrieve the technician's name from the technicians reducer */}
						{technicianName}
					</Button>
				</Link>
			)
		}

		// If technician had been assigned but they rejected the job
		else if (
			job.technician !== null &&
			job.technicianResponse === TECHNICIAN_REJECTED
		) {
			return (
				<Link to={`/dashboard/joblog/assigntechnician/${job._id}`}>
					<h5 className="mb-0">
						<span className="badge badge-danger font-weight-normal">
							Technician rejected
							<br />
							<small>Click to reassign</small>
						</span>
					</h5>
				</Link>
			)
		}

		// If a technician was assigned but hasn't responded yet
		else if (
			job.technician !== null &&
			job.technicianResponse === TECHNICIAN_PENDING
		) {
			return (
				<Link to={`/dashboard/joblog/assigntechnician/${job._id}`}>
					<h5 className="mb-0">
						<span className="badge badge-warning font-weight-normal">
							{technicianName} <br />{" "}
							<small>
								(Pending Confirmation) <br /> Click to reassign
							</small>
						</span>
					</h5>
				</Link>
			)
		}
	}

	// Render the headers of the Job Log Table
	const renderTableHeaders = (tableHeaders) => {
		return tableHeaders.map((th, i) => {
			return <th key={i}>{th}</th>
		})
	}

	// All the relevant tableheaders, subject to change
	let tableHeaders = [
		"Time Received",
		"Job No.",
		"Lead Generator",
		"Job Description",
		"Technician",
		"Status",
	]

	

	const totalResults =
		props.jobs !== undefined ? _.values(props.jobs).length : null

	return (
		<Container fluid className="py-4 px-5">
			<BodyTitle title="Job Log 📋" />

			<div style={{ color: "rgb(127, 142, 159)" }} className="mb-4">
				Job leads sent from your Lead Generators will appear here.
			</div>
			{/* Body Header */}
			<div className="d-flex flex-row align-items-end justify-content-between mb-2">
				<div className="d-flex flex-row align-items-end justify-content-between">
						{/* Header Titles */}
						{/* <Button
							size=""
							className="mr-2 btn-primary pr-1"
							onClick={() => console.log("Fetching jobs")}
						>
							Fetch Jobs
							<ArrowRepeat className="ml-1" style={{ verticalAlign: "-.130em" }} />
						</Button> */}
						<TableResults totalResults={totalResults} />
				</div>

				{/* Header Buttons */}
				<div className="d-flex">
					<div className="d-block mr-2">
						<ExportToCsv
							accountName={props.accountName}
							jobs={props.jobs}
							technicians={props.technicians}
							leadGenerators={props.leadGenerators}
							/>
					</div>

					{/* Apply Filters to table button */}

					<Button
						size="sm"
						className="btn-secondary pr-1"
						onClick={() => toggleFilters()}
					>
						Apply Filters{" "}
						<Filter style={{ verticalAlign: "-.100em" }} />
					</Button>
				</div>
			</div>

			<Table striped bordered hover style={{ fontSize: "0.8rem" }}>
				<thead>
					<tr style={{ whiteSpace: "nowrap" }}>
						{renderTableHeaders(tableHeaders)}
					</tr>
				</thead>
				<tbody>{renderJobs(props.jobs)}</tbody>
			</Table>

			{/* Pagination */}
			{/* <PaginationBar/> */}

			{/* Path for assigning technician to a job */}
			<PrivateRoute
				path="/dashboard/joblog/assigntechnician/:_id"
				component={AssignTechnician}
			/>

			<JobLogFilters
				display={displayFilters}
				toggleFilters={toggleFilters}
			/>
		</Container>
	)
}

const mapStateToProps = (state) => {
	return {
		jobs: state.jobs,
		jobLogFilters: state.auth.userInfo
			? state.auth.userInfo.jobLogFilters
			: {},
		leadGenerators: state.leadGenerators,
		technicians: state.technicians,
		accountName: state.auth.userInfo.accountName
	}
}

export default connect(mapStateToProps, {
	acceptJob,
	rejectJob,
	fetchJobs,
	fetchLeadGenerators,
	fetchTechnicians,
})(JobLog)
