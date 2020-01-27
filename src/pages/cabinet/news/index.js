import React, {useEffect, useState} from "react";
import NewsItem from "components/cabinet-news-item";
import useAxios from "hooks/useAxios";

const News = () => {

    const [news, setNews] = useState([]);
    const [page] = useState(1);
    const [limit] = useState(20);
    const [{response, loading, error}, doAxios] = useAxios(`q=news&page=${page}&pageSize=${limit}&language=en`);

    useEffect(() => {
        doAxios();
    }, [doAxios]);

    useEffect(() => {
        if (!response) return;
        setNews(response);
    }, [response]);

    return (
        <div className="row">
            {loading && <div>Loading...</div>}
            {!!error && <div>Something wrong...</div>}
            {news && news.map(item => <NewsItem key={item.title} item={item}/>)}
        </div>
    )
};

export default News;