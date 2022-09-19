import React from 'react';
import Cookies from 'universal-cookie';


/* set variables from Cookies */
const cookies = new Cookies();

let isAuthenticated = cookies.get('isLoggedIn');
let userId = cookies.get('userId');
let token = cookies.get('jwtToken');
let sessionId = cookies.get('sessionId');
let expirationTime = cookies.get('expiration');


export const defaultSessionInfo = {
    isAuthenticated: false,
    userId: '',
    sessionId: '',
    sessionToken: '',
    expirationTime: '',
    loading: false,
    loginType: '',
    errorMessage: ''
}

export const initSessionInfo = {
    isAuthenticated: false || isAuthenticated,
    userId: '' || userId,
    sessionId: '' || sessionId,
    sessionToken: '' || token,
    expiration: '' || expirationTime,
    loading: false,
    loginType: '',
    errorMessage: ''
}

// Actions
export const SessionActions = {
    LOGIN_START: 0,
    LOGIN_END: 1,
    LOGIN_ERROR: 2,
    LOGOUT_START: 3,
    LOGOUT_END: 4,
    LOGOUT_ERROR: 5,

    IS_LOADING: 6,
    DONE_LOADING: 7,

    SESSION_RESET: 8,
    SESSION_SET: 9
}


export const SessionReducer = (state, action) => {
    // receives SessionState `state` and applies actions based on `action.type` and `action.payload`
    switch(action.type) {

        /* set state */
        case SessionActions.SESSION_SET:
            return {...state, ...action.payload}
        /* Loading */
        case SessionActions.DONE_LOADING:
            return {...state, loading: false}
        case SessionActions.IS_LOADING:
            return {...state, loading: true}

        /* Login */
        case SessionActions.LOGIN_START:
            return {...state, isAuthenticated: false}
        case SessionActions.LOGIN_END:
            return state
        case SessionActions.LOGIN_ERROR:
            return {...state, errorMessage: "Failed to login"}

        /* Logout */
        case SessionActions.LOGOUT_START:
        case SessionActions.LOGOUT_END:
        case SessionActions.SESSION_RESET:
            return defaultSessionInfo
        case SessionActions.LOGOUT_ERROR:
            return {...state, errorMessage: "Failed to logout"}
        default:
            return state
    }
}
