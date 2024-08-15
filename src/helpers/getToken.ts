export const getTokenFromSessionStorage = () => {
    const userDataString = sessionStorage.getItem('auth');

    if (userDataString) {
        const userData = JSON.parse(userDataString);
        return userData.token;
    } else {
        console.log('No user data found in session storage.');
        return null; 
    }
};




