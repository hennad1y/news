import {useContext, useEffect} from "react";

import {NewsContext} from "context/newsContext";
import useFirebase from "hooks/useFirebase";
import {SET_FAVORITES, GET_FAVORITES} from "types";
import {UserContext} from "context/userContext";

const CheckedFavoritesNews = ({children}) => {
    const [userState] = useContext(UserContext);
    const [, dispatch] = useContext(NewsContext);
    const [{response}, doOperationFirebase] = useFirebase();


    useEffect(() => {
        if (!userState.isLoggedIn) return;
        doOperationFirebase(GET_FAVORITES)
    }, [doOperationFirebase, userState]);

    useEffect(() => {
        if (!response) return;

        const favorites = [];

        response.forEach(item => {
            favorites.push(item.val()['title'])
        });

        dispatch({type: SET_FAVORITES, favorites})
    }, [response, dispatch]);

    return children
};

export default CheckedFavoritesNews;