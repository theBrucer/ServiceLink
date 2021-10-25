
/*
    Concatenates a string (cuts it short) and adds three dots "..." at the end
    for aesthetic purposes
*/
export const concatenateText = (string, numCharacters) => {

    if(string.length >= 30) {

        return string.substring(0, numCharacters).trim() + '...';
    }
    return string;

}