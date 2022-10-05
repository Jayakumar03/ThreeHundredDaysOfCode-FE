import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { languageOptions } from "../constants/languageOptions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useKeyPress from "../hooks/useKeyPress";
import LanguagesDropdown from "./LanguagesDropdown";
import ResultTab from "./ResultTab";
import * as codeConstants from '../Constants';

// Style Components.
import { Button } from 'antd';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import styled from "styled-components";

// Cookies.
import Cookies from 'universal-cookie';

// Authentication.
import { Auth } from "aws-amplify";

// Utility.
const getUuid = require('uuid-by-string');

const LandingContainer = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 48px;
  height: calc(100vh - 48px);
  margin-left: 0;
  width: 100%;
  border: 2px white solid;
`
const CodeEditorOuterContainer = styled.main`
  display: flex;
  padding-bottom: 1rem;
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  align-items: flex-start;
  flex-direction: row;
`
const CodeEditorWindowInnerContainer = styled.main`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: column;
  width: 100%;
  height: 100%;  
`
const StyledRunButton = styled((props) => <Button {...props} />)`  
  background-color: #1890ff!important;
  margin-left: 20px;
  height: 35px;
  border-radius: 0.375rem;  
  padding-left: 10px;
  font-size: 12px;
  font-weight: 700;  
  
`
const StyledSubmitButton = styled((props) => <Button {...props} />)`
  background-color: #1890ff!important;
  margin-left: 20px;
  height: 35px;
  border-radius: 0.375rem;  
  padding-left: 10px;
  font-size: 12px;
  font-weight: 700;
`
const ButtonContainer = styled.main`
  padding-top: 1.0rem!important;
  padding-bottom: 0.25rem!important;
  padding-right: 1.5rem!important;
  padding-left: 1.5rem!important;
  display: flex;
  flex-direction: row;
`
// Common Library Methods.
const encode = (str) => {
  return btoa(unescape(encodeURIComponent(str || "")));
};
// ....... Library Methods.

// Common Methods for showing errors.
const getCode = (languageId) => {
  return codeConstants.sources[languageId];
};

// .........................
const Landing = (props) => {
  const [code, setCode] = useState(getCode(languageOptions[0].id));
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("vs-dark");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [userId, setUserId] = useState('');
  const [jwtToken, setJwtToken] = useState('');
  const [outputText, setOutputText] = useState('');
  const [inputText, setInputText] = useState('');
  const [statusLine, setStatusLine] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [runButtonLoading, setRunButtonLoading] = useState(false);
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false); 

  const problemId = props.problemId || '';

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    setLanguage(sl);
    setCode(getCode(sl.id));
  };
  
  // Setting user properties when the user lands on the page.
  // TODO(Ravi): This should be moved to a library method.
  async function getUserDetailsCognito() {  
    const currentSessionResponse = await Auth.currentSession();
    const accessToken = currentSessionResponse.getAccessToken();
    const jwtToken = accessToken.getJwtToken();
    setJwtToken(jwtToken);
  }
  async function getUserDetailsGoogleSSO(){
    const userAuth = await Auth.currentAuthenticatedUser();
    const userId = getUuid(userAuth.email);
    setUserId(userId);
  }
  const getUserDetails = () => {
    const cookies = new Cookies();
    const loginType = cookies.get('loginType');
    if (loginType === 'cognito') {
      getUserDetailsCognito();
    } else {
      getUserDetailsGoogleSSO();
    }
  };
  // .......  Setting User Details .......

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);      
    }
    getUserDetails();
  }, [ctrlPress, enterPress]);
  
  // Handler for action when the user changes the code in the Editor.
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };
  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Handles the code run button.
  const handleCodeRun = () => {
    if (code.trim() === "") {
        console.log('Source code cannot be empty.');
        return;
    } else {
        setRunButtonLoading(true);
    }
    setOutputText('');   
    const sourceValue = encode(code);
    const stdinValue = encode(inputText);
    const languageId = language.id;
    var data = {
        source_code: sourceValue,
        language_id: languageId,
        stdin: stdinValue,
        compiler_options: '',
        command_line_arguments: '',
        redirect_stderr_to_stdout: true,
        user_id: userId,
        problem_id: problemId
    };
    const handleCodeSubmission = (data) => {    
      const status = data.status;
      setStatusLine(status.description);
      setStatusMsg(status.description);      
      setRunButtonLoading(false);
    }
    const sendRequest = function(data) {
      const options = {
        method: "POST",
        url: process.env.REACT_APP_API_URL + "/submissions",
        params: { base64_encoded: "true", fields: "*" },
        headers: {
          "Content-Type": "application/json",
        },
        // TODO(Ravi): Should the data be string or JSON?
        data: JSON.stringify(data),
      };
      axios
      .request(options)
      .then(function (response) {
        handleCodeSubmission(JSON.parse(response));
      })
      .catch((error) => {
        console.log(error)
      });
    }
    sendRequest(data);
  };
  const handleSubmitCode = () => {};

  // Handles the action when the user saves the code.
  // const handleSubmitCode = () => {
  //   if (code.trim() === "") {
  //     showMessage("", "Source code can't be empty!");
  //     return;
  //   } else {        
  //     setSubmitButtonLoading(true);
  //   }
  //   setOutputText('');
  //   const sourceValue = encode(sourceEditor.getValue());
  //   const stdinValue = encode(stdinEditor.getValue());
  //   const languageId = language.id;
  //   const data = {
  //       source_code: sourceValue,
  //       language_id: languageId,
  //       stdin: stdinValue,
  //       compiler_options: '',
  //       command_line_arguments: '',
  //       redirect_stderr_to_stdout: true,
  //       user_id: userId,
  //       problem_id: problemId
  //   };
  //   const sendRequest = function(data) {
  //       axios
  //       .request(options)
  //       .then(function (response) {
  //         handleCodeSubmission(JSON.parse(response));
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       });
  //     }
  //     sendRequest(data);
  //   }
        
  //           url: apiUrl + `/google/submitCodeSolution`,
  //           type: "POST",
  //           async: true,
  //           contentType: "application/json",
  //           data: JSON.stringify(data),
  //           xhrFields: {
  //               withCredentials: apiUrl.indexOf("/secure") != -1 ? true : false
  //           },
  //           success: function (dataStr, textStatus, jqXHR) {
  //               if (wait == true) {
  //                   const data = JSON.parse(dataStr);
  //                   handleCodeSubmission(data);
  //               } else {
  //                   setTimeout(fetchSubmission.bind(null, data.token), check_timeout);
  //               }
  //           },
  //           error: handleRunError
  //       });
  //   }
  //   sendRequest(data);
  // }

  
  return (
    <LandingContainer>
      <div className="flex flex-row">
        <ButtonContainer>
          <LanguagesDropdown onSelectChange={onSelectChange} />           
          <StyledRunButton 
            type="primary" 
            icon={<PlayArrowIcon />} 
            onClick={handleCodeRun}
            loading={runButtonLoading}
            >
            Run Code
          </StyledRunButton>
          <StyledSubmitButton 
            type="primary" 
            icon={<PlayArrowIcon />} 
            loading={submitButtonLoading}
            onClick={handleSubmitCode}
            > 
            Submit Code 
            </StyledSubmitButton>          
          </ButtonContainer>  
      </div>
      <CodeEditorOuterContainer>        
        <CodeEditorWindowInnerContainer>
          <CodeEditorWindow            
            onChange={onChange}
            language={language?.value}
            code={code}
            theme={theme.value}
          />
        </CodeEditorWindowInnerContainer>
        <ResultTab />
      </CodeEditorOuterContainer>      
    </LandingContainer>
  );
};
export default Landing;