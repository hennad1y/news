import React, {useEffect, useState} from "react";
import useAxios from "hooks/useAxios";
import {Link} from "react-router-dom";

const NewsMore = ({match}) => {
    const [newsItem, setNewsItem] = useState(null);
    const [linkBack] = useState(localStorage.getItem('urlForLinkBack'));
    const [{response, loading, error}, doAxios] = useAxios(`qInTitle=${match.params.slug}`);

    localStorage.removeItem('urlForLinkBack');

    useEffect(() => {
        doAxios();
    }, [doAxios]);

    useEffect(() => {
        if (!response) return;
        setNewsItem(response.articles[0]);
    }, [response]);

    console.log(error);

    return (
        <>
            {loading && <div>Loading...</div>}
            {!!error && <div>Something wrong...</div>}
            {newsItem && (
                <>
                    <Link to={{pathname: '/news', state: {linkBack}}}>Back</Link>
                    <div>{newsItem.title}</div>
                </>
            )}
        </>
    )
};

export default NewsMore;