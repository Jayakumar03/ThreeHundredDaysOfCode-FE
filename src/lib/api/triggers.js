import { Auth } from "aws-amplify";
import axios from "axios";
import Cookies from "universal-cookie";
import { showMessage } from "../../utils/error"
// Design Components
import { message } from 'antd';


// Index build Cognito User
const handleTriggerIndexBuildCognitoUser = async() => {
    const query = process.env.REACT_APP_API_URL + '/buildIndex';
    const res = await Auth.currentSession();
    const accessToken = res.getAccessToken();
    const jwtToken = accessToken.getJwtToken();
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtToken
        },
        body: JSON.stringify({
            'userId': accessToken.payload.sub,
            'userName': accessToken.payload.username,
            'userEmail': accessToken.payload.username,
            'dataSource': 'ALL'
        })
    };
    triggerIndexBuild(query, requestOptions);
}

const triggerIndexBuild = (query, requestOptions) => {
    fetch(query, requestOptions)
        .then(res => res.json())
        .then(data => {
    console.log('Response', data);
    if (data.message === 'Success') {
        const successMessage = "Index build triggered successfully.";
        showMessage(successMessage);
    } else {
        const errorMessage = "Something went wrong. Please try again, later.";
        showMessage(null, errorMessage);
    }
    })
    .catch(console.log)
}

const handleTriggerIndexBuildGoogleSSO = async() => {}


const handleTriggerIndexBuild = async() => {
    const cookies = new Cookies();
    const loginType = cookies.get('loginType', { path: '/' });
    if (loginType === 'cognito') {
        handleTriggerIndexBuildCognitoUser();
    } else {
        handleTriggerIndexBuildGoogleSSO();
    }
}

export {
    handleTriggerIndexBuild
}