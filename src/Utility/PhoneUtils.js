// Format Phone number from 1234567890 to (123) 456-7890
export const formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
}


export const normalizePhoneNumber = (value, previousValue) => {
    // return nothing if no value
    if (!value) return value;

    // only allows 0-9 inputs
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (!previousValue || value.length > previousValue.length) {

        // returns: "x", "xx", "xxx"
        if (cvLength < 4) return currentValue;

        // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
        if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;

        // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
        return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
    }
};

// Extract numbers from formatted phone number
// Input: (123) 456-7890
// Output: 1234567890
export const extractNumbers = (number) => {
    let regex = /\d/g;
    return number.match(regex).join("");
}


// Validate Phone number with following conditions:
//  Exactly 9 numbers
//  Doesn't start with a 0
// Returns "True" or "False"
export const isValidPhoneNumber = (number) => {

    // if(number) {
    //     number = number.match( /\D+/g);
    //     // console.log("numberff is", number)
    // }
    

    // console.log("number is", number)

    let reg = /^[0-9]{10}$/;

    return reg.test(number);
}
