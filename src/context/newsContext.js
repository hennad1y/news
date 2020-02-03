import React, {createContext, useReducer} from "react";

const initialState = {
    linkBack: null,
    favorites: null
};

const reducer = (state, action) => {
    const {linkBack, favorites, type} = action;
    switch (type) {
        case 'SETLINK':
            return {...state, linkBack};
        case 'SETFAVORITES':
            return {...state, favorites};
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