import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { ERROR, SUCCESS, WARNING } from './notificationTypes';


const AlertNotification = (props) => {

    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert onClose={() => setShow(false)} className="text-center" {...props} >
                {props.message}
            </Alert>
        );
    }
    return null;
}


export default AlertNotification;



export const renderTechnicianAlert = (queries) => {

    if (!queries) {
        return undefined
    }

    let message = "";
    let variant = null;

    switch (queries.message) {
        case "add":
            message = "Successfully added technician"
            break;
        case "delete":
            message = "Successfully deleted technician"
            break;
        case "edit":
            message = "Successfully updated technician"
            break;
        default:
            message = ""
    }

    switch (queries.notification) {
        case "success":
            variant = SUCCESS
            break;
        case "warning":
            variant = WARNING
            break;
        case "error":
            variant = ERROR
            break;
        default:
            message = ""
    }

    return (


        < AlertNotification variant={variant} message={message} dismissible={true} />
    )
}

export const renderLeadGeneratorAlert = (queries) => {

    if (!queries) {
        return undefined
    }

    let message = "";
    let variant = null;

    switch (queries.message) {
        case "add":
            message = "Successfully added lead generator"
            break;
        case "delete":
            message = "Successfully deleted lead generator"
            break;
        case "edit":
            message = "Successfully updated lead generator"
            break;
        default:
            message = ""
    }

    switch (queries.notification) {
        case "success":
            variant = SUCCESS
            break;
        case "warning":
            variant = WARNING
            break;
        case "error":
            variant = ERROR
            break;
        default:
            message = ""
    }

    return (

        < AlertNotification variant={variant} message={message} dismissible={true} />
    )
}


export const renderSettingsAlert = (queries) => {
    if (!queries) {
        return undefined
    }

    let message = "";

    switch (queries.message) {
        case "updated":
            message = "Successfully updated your account information"
            break;

        default:
    }

    return (
        < AlertNotification variant={SUCCESS} message={message} className="mb-3 text-center" dismissible={true} />
    )

}


export const renderEmailAlert = (isConfirmed) => {
    if (isConfirmed) {

        let message = (<span>
            Please confirm your email address (an email was sent to your inbox for instructions). <Alert.Link onClick={() => alert("Clicked!")}>Resend confirmation email</Alert.Link>
        </span>)
        // Please verify your email address. <
        // (Please verify your email address. <a onClick="">Click here to resend confirmation email</a>})

        return (
            < AlertNotification variant={ERROR} message={message} className="mb-3 text-center" />
        )
    }
}