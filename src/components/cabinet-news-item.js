import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {NewsContext} from "context/newsContext";
import useFirebase from "hooks/useFirebase";
import classNames from "classnames";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const NewsItem = ({item}) => {

    const [newsState, dispatch] = useContext(NewsContext);
    const [{response}, doOperationFirebase] = useFirebase();
    const [linkBack] = useState(localStorage.getItem('urlForLinkBack'));

    const setLinkBack = () => dispatch({type: 'SETLINK', linkBack});

    useEffect(() => {
        if (!response) return;

        const favorites = [];

        response.forEach(item => {
            favorites.push(item.val()['title'])
        });

        dispatch({type: 'SETFAVORITES', favorites})

    }, [response, dispatch]);

    const handleFavoriteNews = async (title) => {
        const userUid = firebase.auth().currentUser.uid;
        const isExist = newsState.favorites && newsState.favorites.filter(favorite => (favorite === item.title));
        const ref = firebase.database().ref(`/favorites/${userUid}`);

        if (!isExist.length) {
            await ref.push({title});
        } else {
            await ref.orderByChild('title').once('value', result => {
                const favorites = {};

                result.forEach(item => {
                    if (item.val()['title'] !== title) return;
                    if (typeof item.val()['title'] !== "string") return;

                    favorites[item.key] = null
                });

                ref.update(favorites);
            });
        }

        doOperationFirebase('getFavorites')
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