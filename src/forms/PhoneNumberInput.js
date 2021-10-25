import React, {useState } from 'react'
import { AsYouType} from 'libphonenumber-js'

function PhoneNumberInput() {

    const [phoneNumber, setPhoneNumber] =  useState("");

    console.log("Phone number is", phoneNumber)


    const formatPhoneNumber = (number) => {
        setPhoneNumber(new AsYouType('US').input(number))
    }


    return (
        <div>
            <input
                type="text"
                onChange={e => formatPhoneNumber(e.target.value)}
                value={phoneNumber}
            />
        </div>
    )
}

export default PhoneNumberInput;
