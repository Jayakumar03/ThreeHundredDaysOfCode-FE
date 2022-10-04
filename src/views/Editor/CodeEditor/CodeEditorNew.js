import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as codeConstants from './Constants.js';
import Editor from '@monaco-editor/react';

// Div Components.
const SiteHeader = styled.main``
const LeftMenu = styled.main``
const SettingsMenu = styled.main``
const LanguageChoiceContainer = styled.main``
const LanguageChoiceDropdown = styled.main``
const RunButton = styled.main``
const SubmitButton = styled.main``

// Handles.
var dataSourceHandle = 'data_source';
var languageHandle = 'language_id';
var stdInHandle = 'stdin';
var stdoutHandle = 'stdout';

// Constants.
var wait = localStorageGetItem("wait") || true;
var checkTimeout = 300;
var blinkStatusLine = ((localStorageGetItem("blink") || "true") === "true");
var editorMode = localStorageGetItem("editorMode") || "normal";
var editorModeObject = null;
var fontSize = 14;
var timeOutIntervalSec = 30;
var saveSessionIntervalSeconds = 10000;
var MonacoVim;
var MonacoEmacs;
var layout;
var sourceEditor;
// TODO(Ravi): Shall we just switch to a Terminal model?
var stdIn;
var stdOut;
var terminal;
var isEditorDirty = false;
var currentLanguageId;
var runBtn;
var updates;
var statusLine;
var statusMsg;
var timeStart;
var timeEnd;
var messageData;



// Helper Methods. 
// TODO(Ravi): Move these out to the common library.
const encode = (str) => {
    return btoa(unescape(encodeURIComponent(str || "")));
}
const decode = (bytes) => {
    var escaped = escape(atob(bytes || ""));
    try {
        return decodeURIComponent(escaped);
    } catch {
        return unescape(escaped);
    }
}
const localStorageSetItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (ignorable) {
  }
}
const localStorageGetItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (ignorable) {
    return null;
  }
}
// TODO(Ravi): Revisit if we need this method anymore.
const getQueryParams = (qs) => {
    qs = qs.split('+').join(' ');
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
}
// End of library methods.
const showMessages = () => {}
const loadMessages = () => {}
const showError = () => {}
// End of methods.

const EditorCore = (props) => {
   const [error, setError] = useState('');
   const [status, setStatus] = useState('');
   const [message, setMessage] = useState('');
   const [runTime, setRunTime] = useState('');
   const [memoryUsed, setMemoryUsed] = useState('');
   const [editorText, setEditorText] = useState('');
   const [languageInt, setLanguageInt] = useState(0);
   const [stdInText, setStdInText] = useState('');
   const [stdOutText, setStdOutText] = useState('');
   const [compilerOptions, setCompilerOptions] = useState('');
   const [commandLineArguments, setCommandLineArguments] = useState('');
   const [fileName, setFileName] = useState('');
   const [languageMode, setLanguageMode] = useState('');

   // .....
   const handleCodeSubmission = (data) => {    
    setStatus(data.status)
   }
   const handleResult = (data) => {
    timeEnd = performance.now();
    var status  = data.status;
    var stdout = decode(data.stdout);
    var compile_output = decode(data.compile_output);
    var time = (data.time === null ? "-" : data.time + "s");
    var memory = (data.memory === null ? "-" : data.memory + "KB");
    setStatus(status.description);
    setMessage(status.description);
    setRunTime(time);
    setMemoryUsed(memory);
    
    const output = [compile_output, stdout].join("\n").trim();
    setEditorText(output);

    // TODO(Ravi): Move this to using ref and get rid of getElementById.
    // Reference: https://stackoverflow.com/questions/38093760/how-to-access-a-dom-element-in-react-what-is-the-equilvalent-of-document-getele
    if (output !== '') {
        const dot = document.getElementById('stdout-dot');
        if (!dot.parentElement.classList.contains('lm_active')) {
            dot.hidden = false;
        }
    }

    // Is there a better way to do this?
    runBtn.removeClass("loading");
   }
   // TODO(Ravi): Should we get this directly from the props?
   const getIdFromURI = () => {
    return window.location.search.substring(1).trim().split('&')[0];
   }
   const downloadSource = () => {
    download(sourceEditor.getValue(), codeConstants.fileNames[languageInt], "text/plain");
   }
   // The Backend and Frontend should communicate language using the ID.
   const loadSavedSource = () => {
        $.ajax({
            url: apiUrl + "/submissions/" + snippet_id + "?fields=source_code,language_id,stdin,stdout,stderr,compile_output,message,time,memory,status,compiler_options,command_line_arguments&base64_encoded=true",
            type: "GET",
            success: function(data, _textStatus) {                
                setEditorText(data[dataSourceHandle]);
                setLanguageInt(data[languageHandle]);
                setStdInText(decode(data[stdInHandle]));
                setStdOutText(decode(data[stdoutHandle]));
                setRunTime(data.time === null ? "-" : data.time + "s");
                setMemoryUsed(data.memory === null ? "-" : data.memory + "KB");
                changeEditorLanguage();
            },
            error: handleRunError
        });
    }
    const handleRun = () => {
        if (editorText.trim() === "") {
            setError('Error - Source Code cannot be empty!');
            return;
        } else {
            runBtn.addClass("loading");
        }
        // TODO(Ravi): Remove getElementById from the codebase.
        document.getElementById('stdout-dot').hidden = true;
        setStdOutText('');
        // Check what does this do? Does it bring focus to stdout?
        var x = layout.root.getItemsById('stdout')[0];
        x.parent.header.parent.setActiveContentItem(x);

        var sourceValue = encode(editorText);
        var stdinValue = encode(stdInText);
        var languageId = languageInt;
        
        var data = {
            source_code: sourceValue,
            language_id: languageId,
            stdin: stdinValue,
            compiler_options: compilerOptions,
            command_line_arguments: commandLineArguments,
            redirect_stderr_to_stdout: true,
            user_id: userId,
            problem_id: problemId
        };

        const sendRequest = (data) => {
            timeStart = performance.now();            
            const query = apiUrl + '/google/sumbmissions';            
            const requestOptions = {
                method: 'POST',
                data: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json'
                }
            };
            fetch(query, requestOptions)            
            .then(res => res.json())
            .then(responseJson => {
              const data = JSON.parse(responseJson).data;
              handleResult(data);
            })
            .catch((error) => {
              setError(error);
              console.log(error);
            });
        }
    }
    const handleSubmit = () => {
        if (editorText.trim() === "") {
            setError('Source cannot be empty');
            return;
        }
        // submitBtn.addClass('loading'); - Do we need this class ?
        document.getElementById('stdout-dot').hidden = true;
        setStdOutText('');        
        const sourceValue = encode(editorText);
        const stdinValue = encode(stdInText);
        const data = {
            source_code: sourceValue,
            language_id: languageId,
            stdin: stdinValue,
            compiler_options: compilerOptions,
            command_line_arguments: commandLineArguments,
            redirect_stderr_to_stdout: true,
            user_id: userId,
            problem_id: problemId
        };

        var sendRequest = function(data) {
            timeStart = performance.now();
            const query = apiUrl + '/google/sumbmitCodeSolution';
            const requestOptions = {
                method: 'POST',
                data: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json'
                }
            };
            fetch(query, requestOptions)
            .then(res => res.json())
            .then(responseJson => {                
                handleCodeSubmission(JSON.parse(responseJson));
                handleResult(data);
              })
              .catch((error) => {
                setError(error);
                console.log(error);
              });                                            
        }
    }
    const changeEditorLanguage = (languageInt, languageMode) => {
        monaco.editor.setModelLanguage(sourceEditor.getModel(), languageMode);
        setLanguageInt(languageInt);
        setFileName(fileNames[languageInt]);
        apiUrl = resolveApiUrl(languageInt);
    }
    const getProblemTemplateAndDefaultInput = () => {
        const url = apiUrl + '/google/problemBaseCode?languageId=' + languageInt + '&problemId=' + problemId;
        const requestOptions = {
            method: 'GET'
        };
        fetch(url, requestOptions)
        .then(res => res.json())
        .then(responseJson => {
            const data = JSON.parse(responseJson);
            setEditorText(decode(data.base_code));
        })
        .catch((error) => {
            setError(error)
        });
    }
    const saveSession = () => {}
    const getSession = () => {}
    const insertTemplate = () => {}
    const loadRandomLanguage = () => {}
    const resizeEditor = () => {}
    const disposeEditorModeObject = () => {}
    const resolveLanguageId = (id) => {
        id = parseInt(id);
        return codeConstants.languageApiUrlTable[id] || id;
    }
    const updateFontSize = (fontSize) => {}
    useEffect(() => {
        // Step-I: Check if the session exists. Load old code from it.
        // Step-II: If no, insert the base code for the language.
        // Step-III: 
    }, []);
    setInterval(saveSession, saveSessionIntervalSeconds);
   // ...


    const apiUrl = process.env.REACT_APP_API_URL;
    // TODO(Ravi): Have a library method that gets the userId.
    const userId = props.userId;
    // Problem Id should be optional.
    const problemId = props.problemId;
    // Session Id should be easy to extract from the query parameter.
    const sessionId = props.sessionId;


    return (
        <>
        <SiteHeader />
        <LeftMenu>
            <SettingsMenu />
            <LanguageChoiceContainer> 
                <LanguageChoiceDropdown />
            </LanguageChoiceContainer>
            <RunButton 
              onClick={handleRun}
            />
            <SubmitButton 
              onClick={handleSubmit}
            />
        </LeftMenu>
        </>
    );
}

export default EditorCore;