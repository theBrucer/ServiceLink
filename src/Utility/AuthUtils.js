
// This is to fetch auth related information from local storage
export const fetchLocalStorage = () => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('userInfo');
    const expiresAt = localStorage.getItem('expiresAt');

    const data = {
        token,
        expiresAt,
        // If userInfo isn't empty, then parse the info into JSON format
        userInfo: userInfo ? JSON.parse(userInfo) : {}
    }

    return data;
}


export const setLocalStorage = ({userInfo, token, expiresAt}) => {	
        localStorage.setItem('token', token)
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        localStorage.setItem('expiresAt', expiresAt)
}

