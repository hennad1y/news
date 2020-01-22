import React, {createContext, useReducer} from "react";

const initialState = {
    isLoading: false,
    isLoggedIn: null,
    user: null
};

const reducer = ({state, action}) => {
    switch (action.type) {
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