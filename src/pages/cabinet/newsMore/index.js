import React, {useEffect, useState} from "react";
import useAxios from "hooks/useAxios";
import {Link} from "react-router-dom";

const NewsMore = ({match}) => {
    const [newsItem, setNewsItem] = useState(null);
    const [{response, loading, error}, doAxios] = useAxios(`qInTitle=${match.params.slug}`);

    useEffect(() => {
        doAxios();
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
                    <Link to="/news">Back</Link>
                    <div>{newsItem.title}</div>
                </>
            )}
        </>
    )
};

export default NewsMore;