import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {NewsContext} from "context/newsContext";

const NewsItem = ({item}) => {
    const [, dispatch] = useContext(NewsContext);
    const [linkBack] = useState(localStorage.getItem('urlForLinkBack'));

    const setLinkBack = () => dispatch({type: 'SETLINK', linkBack});

    return (
        <div className="col-lg-3 mb-2 mt-1">
            <div className="card p-2">
                <img src={item.urlToImage} className="card-img-top" alt={item.title}/>
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <Link to={`/news/${item.title}`} className="btn btn-sm btn-primary"
                          onClick={setLinkBack}>More</Link>
                </div>
            </div>
        </div>
    )
};

export default NewsItem;