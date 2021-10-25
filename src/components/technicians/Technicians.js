import _ from 'lodash'
import React, { Component } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { Plus } from 'react-bootstrap-icons'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteTechnician, fetchTechnicians } from '../../redux/actions/technicianActions'
import { formatPhoneNumber } from '../../Utility/PhoneUtils'
import { getQueryStringKeyValuePairs } from '../../Utility/UrlUtils'
import BodyDescription from '../BodyDescription'
import BodyTitle from '../BodyTitle'
import { renderTechnicianAlert } from '../notifications/AlertNotification'
import PrivateRoute from '../PrivateRoute'
import TableResults from '../TableResults'
import DeleteTechnician from '../technicians/DeleteTechnician'
import AddTechnician from './AddTechnician'

import EditTechnician from './EditTechnician'


class Technicians extends Component {

    componentDidMount = async () => {
        this.props.fetchTechnicians()
    }

    renderTechnicians = () => {

        if (!this.props.technicians) {
            return (<div>Loading</div>)
        }
        else {

            return _.values(this.props.technicians).map(technician => {
                return (
                    <tr key={technician._id}>
                        <td style={{ whiteSpace: "nowrap" }}>{technician.name}</td>
                        <td>{formatPhoneNumber(technician.phoneNumber)}</td>
                        <td>{technician.commissionRate}%</td>
                        <td>{technician.notes}</td>
                        <td
                            style={{ whiteSpace: "nowrap", maxWidth: "100%" }}
                            className="d-flex justify-content-end"

                        >
                            {this.renderTechnicianTableButtons(technician._id)}
                        </td>
                    </tr>
                )
            })
        }
    }

    renderTechnicianTableButtons = (technicianId) => {
        return (
            <>
                <Link to={`/dashboard/technicians/edit/${technicianId}`}>
                    <Button variant="secondary" size="sm" className="mr-2">
                        Edit
                    </Button>
                </Link>
                <Link to={`/dashboard/technicians/delete/${technicianId}`}>
                    <Button variant="danger" size="sm" >
                        Delete
                </Button>
                </Link>

            </>
        )
    }



    render() {

        let queries = getQueryStringKeyValuePairs(this.props.location)
        let totalResults = _.values(this.props.technicians).length;

        return (

            <Container className="py-4">

                <BodyTitle title="Technicians 👨🏻‍🔧👩🏻‍🔧" />
                <BodyDescription description="Technicians can be assigned to job leads. Once assigned, an SMS message with the job information will be dispatched to them." className="mb-4" />


                {renderTechnicianAlert(queries)}

                <div className="d-flex flex-row align-items-end justify-content-between mb-2">

                    <div>
                        {/* Header Titles */}
                        <TableResults totalResults={totalResults} />
                    </div>

                    {/* Header Buttons */}
                    <div className="d-flex align-items-end">
                        <Link to="/dashboard/technicians/add">
                            <Button size="sm" className="pr-1">Add Technician<Plus style={{ verticalAlign: "-.180em" }} /></Button>
                        </Link>
                    </div>
                </div>


                <Table striped hover style={{ fontSize: "0.8rem" }}>
                    <thead>
                        <tr style={{ whiteSpace: "nowrap" }}>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Rate</th>
                            <th>Notes</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.renderTechnicians()}

                    </tbody>
                </Table>




                {/* Paths for adding, editing and deleting the technician */}
                <PrivateRoute path="/dashboard/technicians/delete/:_id" exact component={DeleteTechnician} />
                <PrivateRoute path="/dashboard/technicians/add" exact component={AddTechnician} />
                <PrivateRoute path="/dashboard/technicians/edit/:_id" exact component={EditTechnician} />

            </Container >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        technicians: state.technicians
    }
};


export default connect(mapStateToProps, { fetchTechnicians, deleteTechnician })(Technicians)