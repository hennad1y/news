import React, {useContext, useEffect, useState} from "react";
import {NewsContext} from "context/newsContext";
import NewsItem from "components/cabinet-news-item";
import useAxios from "hooks/useAxios";

const Favorites = () => {

    const [newsState] = useContext(NewsContext);
    const [news, setNews] = useState(null);
    const [{response, loading, error}, doAxios] = useAxios(``);

    useEffect(() => {
        if (!newsState.favorites) return;
        
        doAxios(true, [...newsState.favorites]);
    }, [doAxios, newsState]);

    useEffect(() => {
        if (!response) return;

        setNews(response.map(item => item.data.articles[0]));
    }, [response]);

    return (
        <div className="col-12">
            <div className="row">
                {loading && <div>Loading...</div>}
                {!!error && <div>Something wrong...</div>}
                {(news && news.length === 0) && <div>List Empty</div>}
                {!loading && news && (news.map((item, index) => {
                    return <NewsItem key={item.publishedAt + index} item={item} notActiveLinkBack={true}/>
                }))}
            </div>
        </div>
    )

};

export default Favorites;