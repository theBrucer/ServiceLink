import React from 'react'
import { Button, Container, Table, ButtonGroup, Tooltip, OverlayTrigger } from 'react-bootstrap'

export default function ExportCsvButton(props) {

    /* 
    Props we have for this function is:
    1. Label
    2. Tooltip text
    3. Data to export
    4. Name of the exported file
    */



    return (
        <OverlayTrigger
            key={"left"}
            placement={"left"}
            overlay={
                <Tooltip style={{ backgroundColor: "white !important" }}>
                    Export current Job Log to CSV
        </Tooltip>
            }


        >
            {/* Download to CSV */}
            <CSVLink
                data={csvData}

                // Add today's date to the Job-Log and number of results 
                // when exporting to CSV
                filename={"job-log.csv"}
                target="_blank">
                <Button size="sm" >Export to CSV<BoxArrowUp className="ml-2" /></Button>
            </CSVLink>
        </OverlayTrigger>
    )
}
