import React, {createContext, useReducer} from "react";
import {AUTHORIZED, UNAUTHORIZED, SET_MESSAGE} from "types";

const initialState = {
    isLoading: true,
    isLoggedIn: null,
    message: null
};

const reducer = (state, action) => {
    const {type, message} = action;
    switch (type) {
        case UNAUTHORIZED:
            return {...state, isLoggedIn: false, isLoading: false};
        case AUTHORIZED:
            return {...state, isLoggedIn: true, isLoading: false};
        case SET_MESSAGE:
            return {...state, message};
        default:
            return state;
    }
};

export const UserContext = createContext();

export const UserProvider = ({children}) => {

    const value = useReducer(reducer, initialState);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};