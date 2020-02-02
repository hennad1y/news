import React, {createContext, useReducer} from "react";

const initialState = {
    linkBack: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SETLINK':
            return {...state, linkBack: action.linkBack};
        default:
            return state;
    }
};

export const NewsContext = createContext();

export const NewsProvider = ({children}) => {

    const value = useReducer(reducer, initialState);

    return (
        <NewsContext.Provider value={value}>
            {children}
        </NewsContext.Provider>
    )

};