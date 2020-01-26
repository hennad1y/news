import React, {useContext, useEffect, useState} from "react";
import useAxios from "hooks/useAxios";
import {UserContext} from "context/userContext";
import {Link} from "react-router-dom";

const NewsMore = ({match}) => {
    const [userState] = useContext(UserContext);
    const [newsItem, setNewsItem] = useState();
    const [{response, loading, error}, doAxios] = useAxios(`qInTitle=${match.params.slug}`);

    useEffect(() => {
        if (userState.isLoggedIn) doAxios();
    }, [doAxios, userState]);

    useEffect(() => {
        if (userState.isLoggedIn) doAxios();
    }, [doAxios, userState]);

    useEffect(() => {
        if (!response) return;
        setNewsItem(response[0]);
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