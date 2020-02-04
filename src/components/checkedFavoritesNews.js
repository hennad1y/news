import {useContext, useEffect} from "react";

import {NewsContext} from "context/newsContext";
import useFirebase from "hooks/useFirebase";
import {SET_FAVORITES, GET_FAVORITES} from "types";

const CheckedFavoritesNews = ({children}) => {
    const [, dispatch] = useContext(NewsContext);
    const [{response}, doOperationFirebase] = useFirebase();


    useEffect(() => {
        doOperationFirebase(GET_FAVORITES)
    }, [doOperationFirebase]);

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