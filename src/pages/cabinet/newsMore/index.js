import React, {useContext, useEffect, useState} from "react";
import useAxios from "hooks/useAxios";
import {Link} from "react-router-dom";
import {NewsContext} from "context/newsContext";

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
        <>
            {loading && <div>Loading...</div>}
            {!!error && <div>Something wrong...</div>}
            {newsItem && (
                <>
                    {newsState.linkBack && <Link to="/news">Back</Link>}
                    <div>{newsItem.title}</div>
                </>
            )}
        </>
    )
};

export default NewsMore;