import React, {createContext, useReducer} from "react";

const initialState = {
    isLoading: true,
    isLoggedIn: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'UNAUTHORIZED':
            return {...state, isLoggedIn: false, isLoading: false};
        case 'AUTHORIZED':
            return {...state, isLoggedIn: true, isLoading: false};
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