import React from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { BoxArrowUpRight } from "react-bootstrap-icons"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

const LaunchDashboard = ({ userName }) => {
	return (
		<Container
        className="px-4 pb-4 pt-0 rounded"
        style={{ width: "375px" }}
        >
			<Row>
				<Col>
					<h5 className="text-center mb-2">Welcome back {userName}!</h5>
					<Link to="/dashboard/joblog">
						<Button
							variant={"primary"}
							type="submit"
							className="mt-2"
							style={{ width: "100%" }}
						>
							Launch Dashboard
                            <BoxArrowUpRight
                                className="ml-2"
                                style={{ verticalAlign: "-.090em" }}
                            />
						</Button>
					</Link>
				</Col>
			</Row>
		</Container>
	)
}

const mapStateToProps = (state) => ({
	userName: state.auth.userInfo.accountName,
})

export default connect(mapStateToProps, null)(LaunchDashboard)
