import React, {createContext, useReducer} from "react";
import {SET_LINK, SET_FAVORITES} from "types";

const initialState = {
    linkBack: null,
    favorites: null
};

const reducer = (state, action) => {
    const {linkBack, favorites, type} = action;
    switch (type) {
        case SET_LINK:
            return {...state, linkBack};
        case SET_FAVORITES:
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