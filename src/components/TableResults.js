import React from 'react'

export default function TableResults({ totalResults}) {

    let tableResultsStyle = {
        fontWeight: "bold",
        fontSize: "16px",
        color: "#7F8E9F"
    }

    const renderResults = (totalResults) => {
        if(totalResults !== null) {
            return `Showing ${totalResults} results`
        }
        return "Loading..."
    }


    return (
        <div style={tableResultsStyle}>
            {renderResults(totalResults)}
        </div>
    )
}
