import React from 'react'
import { Button, ButtonGroup, Container } from 'react-bootstrap'
import { ArrowLeftShort, ArrowRightShort } from 'react-bootstrap-icons'

export default function PaginationBar() {



    /*
        Tasks: 
        1. Determine number of jobs per page
        2. Determine how many pages we'll have
        3. Calculate the index of the first job on the page
        4. If the current page is first page, disabled previous
        5. If the current page is the last page, disable next
    */



    return (
        <Container className=" text-center">
            <ButtonGroup>
                <Button variant='secondary' disabled > <ArrowLeftShort /> Prev </Button>
                <Button variant='outline-secondary'> 1 </Button>
                <Button variant='secondary' disabled > Next <ArrowRightShort /> </Button>
            </ButtonGroup>
        </Container>
    )
}
