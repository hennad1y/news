import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {NewsContext} from "context/newsContext";
import FavoriteButton from "components/favorite-button";
import {SET_LINK} from "types";

const NewsItem = ({item, notActiveLinkBack = false}) => {

    const [, dispatch] = useContext(NewsContext);
    const [linkBack] = useState(localStorage.getItem('urlForLinkBack'));

    const setLinkBack = () => dispatch({type: SET_LINK, linkBack});

    return (
        <div className="col-lg-3 mb-2 mt-1">
            <div className="card p-2">
                <img src={item.urlToImage} className="card-img-top" alt={item.title}/>
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <FavoriteButton titleParent={item.title}/>
                    <Link to={`/news/${item.title}`} className="btn btn-sm btn-primary"
                          onClick={() => notActiveLinkBack && setLinkBack}>More</Link>
                </div>
            </div>
        </div>
    )
};

export default NewsItem;