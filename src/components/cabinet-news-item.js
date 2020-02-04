import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {NewsContext} from "context/newsContext";
import useFirebase from "hooks/useFirebase";
import classNames from "classnames";

import {SET_LINK, SET_FAVORITES, GET_FAVORITES, ADD_FAVORITE, GET_VALUES_FAVORITES, UPDATE_FAVORITE} from "types";

const NewsItem = ({item}) => {

    const [newsState, dispatch] = useContext(NewsContext);
    const [{response, responseFavorites}, doOperationFirebase] = useFirebase();
    const [title, setTitle] = useState(null);
    const [linkBack] = useState(localStorage.getItem('urlForLinkBack'));

    const setLinkBack = () => dispatch({type: SET_LINK, linkBack});

    useEffect(() => {
        if (!response) return;

        const favorites = [];

        response.forEach(item => {
            favorites.push(item.val()['title'])
        });

        dispatch({type: SET_FAVORITES, favorites})

    }, [response, dispatch]);

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
        const isExist = newsState.favorites && newsState.favorites.filter(favorite => (favorite === item.title));

        if (!(isExist && isExist.length)) {
            await doOperationFirebase(ADD_FAVORITE, {title});
            doOperationFirebase(GET_FAVORITES);
        } else {
            setTitle(title);
            doOperationFirebase(GET_VALUES_FAVORITES)
        }

    };

    const resultFavorite = newsState.favorites && newsState.favorites.filter(favorite => (favorite === item.title));

    const classIcon = classNames({
        'fa': true,
        'fa-star-o': !resultFavorite || resultFavorite.length === 0,
        'fa-star': resultFavorite
    });

    return (
        <div className="col-lg-3 mb-2 mt-1">
            <div className="card p-2">
                <img src={item.urlToImage} className="card-img-top" alt={item.title}/>
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <button type="button" className="btn btn-sm btn-primary favorite"
                            onClick={() => handleFavoriteNews(item.title)}>
                        <i className={classIcon}/>
                        &nbsp;Add to favorite
                    </button>
                    <Link to={`/news/${item.title}`} className="btn btn-sm btn-primary"
                          onClick={setLinkBack}>More</Link>
                </div>
            </div>
        </div>
    )
};

export default NewsItem;