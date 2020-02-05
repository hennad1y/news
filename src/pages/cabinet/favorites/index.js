import React, {useContext, useEffect, useState} from "react";
import {NewsContext} from "context/newsContext";
import NewsItem from "components/cabinet-news-item";
import useAxios from "hooks/useAxios";

const Favorites = () => {

    const [newsState] = useContext(NewsContext);
    const [index, setIndex] = useState(0);
    const [newsItem, setNewsItem] = useState(false);
    const [news, setNews] = useState([]);
    const [done, setDone] = useState(false);
    const [{response, loading, error}, doAxios] = useAxios(`qInTitle=${newsItem}`);

    useEffect(() => {

        if (!newsState.favorites || newsState.favorites.length === 0) {
            setDone(true);
            return;
        }

        setNewsItem(newsState.favorites[index]);
    }, [index, newsState]);

    useEffect(() => {
        if (!newsItem) return;
        doAxios(true);
    }, [doAxios, newsItem]);

    useEffect(() => {
        if (!response) return;
        if (!loading) return;
        if ((loading && news.length) && (news[news.length - 1].title === response.articles[0].title)) return;

        setNews(news.concat(response.articles[0]));

        if (!newsState.favorites[index + 1]) {
            setDone(true);
            return;
        }
        setIndex(index + 1);
    }, [response, index, newsState, loading, news]);

    return (
        <div className="col-12">
            <div className="row">
                {!done && <div>Loading...</div>}
                {!!error && <div>Something wrong...</div>}
                {(done && (news && news.length === 0)) && <div>List Empty</div>}
                {done && news && (news.map((item, index) => {
                    return <NewsItem key={item.publishedAt + index} item={item} notActiveLinkBack={true} />
                }))}
            </div>
        </div>
    )

};

export default Favorites;