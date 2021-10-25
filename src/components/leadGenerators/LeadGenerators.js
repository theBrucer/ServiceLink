import _ from 'lodash'
import React, { Component } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { Plus } from 'react-bootstrap-icons'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchLeadGenerators } from '../../redux/actions/leadGeneratorActions'
import { formatPhoneNumber } from '../../Utility/PhoneUtils'
import { getQueryStringKeyValuePairs } from '../../Utility/UrlUtils'
import BodyDescription from '../BodyDescription'
import BodyTitle from '../BodyTitle'
import { renderLeadGeneratorAlert } from '../notifications/AlertNotification'
import PrivateRoute from '../PrivateRoute'
import TableResults from '../TableResults'
import AddLeadGenerator from './AddLeadGenerator'
import DeleteLeadGenerator from './DeleteLeadGenerator'
import EditLeadGenerator from './EditLeadGenerator'

class LeadGenerators extends Component {


    componentDidMount = async () => {
        this.props.fetchLeadGenerators()
    }

    renderLeadGenerators = () => {

        if (!this.props.leadGenerators) {
            return (<div>Loading</div>)
        }
        else {

            return _.values(this.props.leadGenerators).map(leadGenerator => {
                return (
                    <tr key={leadGenerator._id}>
                        <td style={{ whiteSpace: "nowrap" }}>{leadGenerator.name}</td>
                        <td>{formatPhoneNumber(leadGenerator.phoneNumber)}</td>
                        <td>${leadGenerator.fee}</td>
                        <td>{leadGenerator.notes}</td>
                        <td
                            style={{ whiteSpace: "nowrap", maxWidth: "100%" }}
                            className="d-flex justify-content-end"

                        >
                            {this.renderLeadGeneratorTableButtons(leadGenerator._id)}
                        </td>
                    </tr>
                )
            })
        }
    }

    renderLeadGeneratorTableButtons = (leadGeneratorId) => {
        return (
            <>
                <Link to={`/dashboard/leadgenerators/edit/${leadGeneratorId}`}>
                    <Button variant="secondary" size="sm" className="mr-2">
                        Edit
                </Button>
                </Link>
                <Link to={`/dashboard/leadgenerators/delete/${leadGeneratorId}`}>
                    <Button variant="danger" size="sm">
                        Delete
                    </Button>
                </Link>
            </>
        )
    }


    render() {

        let queries = getQueryStringKeyValuePairs(this.props.location)
        let totalResults = _.values(this.props.leadGenerators).length;

        return (
            <Container className="py-4">

                <BodyTitle title="Lead Generators 📥" />
                <BodyDescription description="Lead Generators are all the sources job leads are received from. Accepting or confirming job leads will notify your lead generator via SMS." />

                {renderLeadGeneratorAlert(queries)}

                {/* Body Header */}
                <div className="d-flex flex-row align-items-end justify-content-between mb-2">

                    <div>
                        {/* Header Titles */}

                        <TableResults totalResults={totalResults} />
                    </div>

                    {/* Header Buttons */}
                    <div className="d-flex align-items-end">
                        <Link to="/dashboard/leadgenerators/add">
                            <Button size="sm" className="pr-1">Add Lead Generator<Plus style={{ verticalAlign: "-.180em" }} /></Button>
                        </Link>
                    </div>
                </div>




                <Table striped hover style={{ fontSize: "0.8rem" }}>
                    <thead>
                        <tr style={{ whiteSpace: "nowrap" }}>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Fee</th>
                            <th>Notes</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.renderLeadGenerators(this.props.leadGenerators)}

                    </tbody>
                </Table>


                {/* Path for deleting the lead generator */}
                <PrivateRoute path="/dashboard/leadgenerators/delete/:_id" component={DeleteLeadGenerator} />
                <PrivateRoute path="/dashboard/leadgenerators/add" exact component={AddLeadGenerator} />
                <PrivateRoute path="/dashboard/leadgenerators/edit/:_id" exact component={EditLeadGenerator} />


            </Container >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        leadGenerators: state.leadGenerators
    }
};


export default connect(mapStateToProps, { fetchLeadGenerators })(LeadGenerators)