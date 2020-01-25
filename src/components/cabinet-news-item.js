import React from "react";
import {Link} from "react-router-dom";

const NewsItem = ({item}) => {
    return (
        <div className="col-xs-12 col-lg-4 mb-2 mt-1">
            <div className="card p-2">
                <img src={item.urlToImage} className="card-img-top" alt={item.title}/>
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <Link to={`/news/${item.title}`} className="btn btn-sm btn-primary">More</Link>
                </div>
            </div>
        </div>
    )
};

export default NewsItem;