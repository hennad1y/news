import React, {useContext, useEffect, useState} from "react";
import LayoutCabinet from "pages/cabinet/layoutCabinet";
import {UserContext} from "context/userContext";
import NewsItem from "components/cabinet-news-item";
import useAxios from "hooks/useAxios";

const News = () => {

    const [userState] = useContext(UserContext);
    const [news, setNews] = useState([]);
    const [page] = useState(1);
    const [limit] = useState(15);
    const [{response, loading, error}, doAxios] = useAxios(`q=news&page=${page}&pageSize=${limit}`);

    useEffect(() => {
        if (userState.isLoggedIn) doAxios();
    }, [doAxios, userState]);

    useEffect(() => {
        if (!response) return;
        setNews(response);
    }, [response]);

    return (
        <LayoutCabinet>
            <div className="row">
                {loading && <div>Loading...</div>}
                {!!error && <div>Something wrong...</div>}
                {news && news.map(item => <NewsItem key={item.title} item={item}/>)}
            </div>
        </LayoutCabinet>
    )
};

export default News;