import React from "react"
import { Nav, Navbar, NavDropdown } from "react-bootstrap"
import { BoxArrowRight } from "react-bootstrap-icons"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import logo from "../../img/logo192.png"

// Logout functionality
import { logOutUser } from "../../redux/reducers"

// Styling the active link
import "./Navbar.css"
import _ from "lodash"
import { JOB_REJECTED } from "../../Utility/JobUtils"

const Navigation = (props) => {


	// Renders the total number of unassigned jobs to indicate
	// to the dispatcher that they have jobs to review
	const renderJobLogBadge = (totalUnassignedJobs) => {
		if (totalUnassignedJobs !== 0) {
			return (
				<span className="ml-1 badge badge-danger rounded-circle">
					{totalUnassignedJobs}
				</span>
			)
		}
		return null
	}

	let totalUnassignedJobs = props.totalUnassignedJobs

	return (
        <>
		<Navbar
			bg="light"
			variant="light"
			className="navbar shadow-sm"
		>
			<Link to="/dashboard/joblog">
				<Navbar.Brand>
					<img
						alt=""
						src={logo}
						height="30"
						className="d-inline-block align-top mr-2"
					/>
					Leadeem
				</Navbar.Brand>
			</Link>

			<Nav className="mr-auto">
				<NavLink className="nav-link" to="/dashboard/joblog">
					Job Log
					{renderJobLogBadge(totalUnassignedJobs)}
				</NavLink>

				<NavLink className="nav-link" to="/dashboard/report">
					Report
				</NavLink>

				<NavLink className="nav-link" to="/dashboard/technicians">
					Technicians
				</NavLink>

				<NavLink className="nav-link" to="/dashboard/leadgenerators">
					Lead Generators
				</NavLink>

				<NavLink className="nav-link" to="/dashboard/settings">
					Settings
				</NavLink>
			</Nav>

			<Nav>
				<NavDropdown
					title={props.accountName}
					id="collapsible-nav-dropdown"
					align="end"
					alignRight
				>
					{/* <NavDropdown.Item eventKey="1">
                            <NavLink className="dropdown-link" to="/dashboard/settings">Settings</NavLink>
                        </NavDropdown.Item>
                        <NavDropdown.Divider /> */}

					<NavDropdown.Item
						eventKey="4"
						onClick={props.logOutUser}
					>
						Log out{" "}
						<BoxArrowRight
							className="ml-2"
							style={{ verticalAlign: "-.180em" }}
						/>
					</NavDropdown.Item>
				</NavDropdown>
			</Nav>
		</Navbar>
        </>
	)
}

const mapStateToProps = (state) => {
	return {
		totalUnassignedJobs: _.values(state.jobs).filter((job) => {
			// Only count jobs that haven't been accepted/rejected AND haven't been assigned yet
			return job.technician === null && job.status !== JOB_REJECTED
		}).length,
		accountName: state.auth.userInfo ? state.auth.userInfo.accountName : ""
	}
}

export default connect(mapStateToProps, { logOutUser })(Navigation)
