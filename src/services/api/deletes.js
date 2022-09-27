import { Cookie } from "@mui/icons-material";
import { Auth } from "aws-amplify";
import Cookies from "universal-cookie";
import { showMessage } from "../../utils/error";
// Design Components
import { message } from 'antd';

const deleteAllData = (query, requestHeaders) => {
    fetch(query, requestHeaders)
    .then(res => res.json())
    .then(data => {
        console.log('Response', data);
        if (data.message === 'Success') {
            const successMessage = "Your data and credentials have been succesfully deleted.";
            showMessage(successMessage);
        } else {
            const errorMessage = "Something went wrong. Please try again, later.";
            showMessage(null, errorMessage);
        }
    })
    .catch(console.log)
}

const handleDeleteAllDataCognitoUser = async() => {
    const query = process.env.REACT_APP_API_URL + '/deleteAllData';
    const res = await Auth.currentSession();
    const accessToken = res.getAccessToken();
    const jwtToken = accessToken.getJwtToken();
    const requestHeaders = {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + jwtToken }
    };
    deleteAllData(query, requestHeaders);
}

const handleDeleteAllDataGoogleSSO = async() => {  
    const requestHeaders = { 'method': 'POST' };  
    const query = process.env.REACT_APP_API_URL + '/google/deleteAllData';
    deleteAllData(query, requestHeaders);
}

const handleDeleteAllData = async() =>  {  
    const cookies = new Cookies();
    const loginType = cookies.get('loginType', { path: '/' });
    if (loginType === 'cognito') {
        handleDeleteAllDataCognitoUser();
    } else {
        handleDeleteAllDataGoogleSSO();
    }
}

export {
    handleDeleteAllData
}
