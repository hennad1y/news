import React, {useContext, useEffect, useState} from "react";
import classNames from "classnames";
import useFirebase from "hooks/useFirebase";
import {NewsContext} from "context/newsContext";

import {SET_FAVORITES, GET_FAVORITES, ADD_FAVORITE, GET_VALUES_FAVORITES, UPDATE_FAVORITE, SUBMITTED_DONE} from "types";

const FavoriteButton = ({titleParent}) => {

    const [newsState, dispatch] = useContext(NewsContext);
    const [{response, isSubmitted, responseFavorites}, doOperationFirebase] = useFirebase();
    const [title, setTitle] = useState(null);

    useEffect(() => {
        if (!response) return;

        const favorites = [];

        response.forEach(item => {
            favorites.push(item.val()['title'])
        });

        dispatch({type: SET_FAVORITES, favorites});
        doOperationFirebase(SUBMITTED_DONE);

    }, [response, dispatch, doOperationFirebase]);

    useEffect(() => {
        if (!responseFavorites) return;

        const favorites = {};

        responseFavorites.forEach(item => {
            if (item.val()['title'] !== title) return;
            favorites[item.key] = null
        });

        const updateFavorites = async () => await doOperationFirebase(UPDATE_FAVORITE, {favorites});

        updateFavorites().finally(() => doOperationFirebase(GET_FAVORITES));

    }, [responseFavorites, doOperationFirebase, title]);

    const handleFavoriteNews = async (title) => {
        const isExist = newsState.favorites && newsState.favorites.filter(favorite => (favorite === title));

        if (!(isExist && isExist.length)) {
            await doOperationFirebase(ADD_FAVORITE, {title});
            doOperationFirebase(GET_FAVORITES);
        } else {
            setTitle(title);
            doOperationFirebase(GET_VALUES_FAVORITES)
        }

    };

    const resultFavorite = newsState.favorites && newsState.favorites.filter(favorite => (favorite === titleParent));

    const classIcon = classNames({
        'fa': true,
        'fa-star-o': !resultFavorite || resultFavorite.length === 0,
        'fa-star': resultFavorite
    });

    return (
        <button type="button" className="btn btn-sm btn-primary favorite" disabled={isSubmitted}
                onClick={() => handleFavoriteNews(titleParent)}>
            <i className={classIcon}/>
            &nbsp;Add to favorite
        </button>
    )
};

export default FavoriteButton;