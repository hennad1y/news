import React, {useContext, useEffect, useState} from "react";
import useAxios from "hooks/useAxios";
import {Link} from "react-router-dom";
import {NewsContext} from "context/newsContext";
import {format} from "date-fns";

const NewsMore = ({match}) => {
    const [newsItem, setNewsItem] = useState(null);
    const [newsState] = useContext(NewsContext);
    const [{response, loading, error}, doAxios] = useAxios(`qInTitle=${match.params.slug}`);

    console.log();

    useEffect(() => {
        doAxios(true);
    }, [doAxios]);

    useEffect(() => {
        if (!response) return;
        setNewsItem(response.articles[0]);
    }, [response]);

    return (
        <div className="row justify-content-center mt-4">
            {loading && <div>Loading...</div>}
            {!!error && <div>Something wrong...</div>}
            {newsItem && (
                <div className="col-6 p-2">
                    {newsState.linkBack && <Link to="/news" className="mb-2">Back</Link>}
                    <div className="d-flex justify-content-between mb-2">
                        <span>{newsItem.author}</span>
                        <span>{format(new Date(newsItem.publishedAt), 'dd.MM.yyyy H:mm')}</span>
                    </div>
                    <img src={newsItem.urlToImage} alt={newsItem.title} className="w-100 mb-2"/>
                    <h2 className="mb-4">{newsItem.title}</h2>
                    <div>{newsItem.description}</div>
                </div>
            )}
        </div>
    )
};

export default NewsMore;