import {useContext, useEffect} from "react";

import {NewsContext} from "context/newsContext";
import useFirebase from "hooks/useFirebase";


const CheckedFavoritesNews = ({children}) => {
    const [, dispatch] = useContext(NewsContext);
    const [{response}, doOperationFirebase] = useFirebase();


    useEffect(() => {
        doOperationFirebase('getFavorites')
    }, [doOperationFirebase]);

    useEffect(() => {
        if (!response) return;

        const favorites = [];

        response.forEach(item => {
            favorites.push(item.val()['title'])
        });

        dispatch({type: 'SETFAVORITES', favorites})
    }, [response, dispatch]);

    return children
};

export default CheckedFavoritesNews;