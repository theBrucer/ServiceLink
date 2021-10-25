import {DateTime} from 'luxon'

export const convertDateStampToString = (date) => {

    // Feb 4th 3:14 PM
    return DateTime.fromISO(date).toFormat('MMM d h:mm a');

}


export const renderCsvTime = () => {
    return DateTime.now().toFormat('MM-d-yyyy h:mm a')
}