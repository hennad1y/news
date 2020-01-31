import React, {useEffect, useState} from "react";
import NewsItem from "components/cabinet-news-item";
import useAxios from "hooks/useAxios";
import Toolbar from "components/toolbar";

const News = () => {

    const [news, setNews] = useState(null);
    const [limit] = useState(20);
    const [language, setLanguage] = useState('en');
    const [languages] = useState(['en', 'ru', 'fr', 'de', 'es']);
    const [page, setPage] = useState(1);
    const [searchString, setSearchString] = useState('');
    const [timeoutSearchString, setTimeoutSearchString] = useState('');
    const [totalPages, setTotalPages] = useState(null);
    const [{response, loading, error}, doAxios] = useAxios(`q=news&page=${page}&pageSize=${limit}&language=${language}`);
    const [{response: responseSearch, loading: loadingSearch, error: errorSearch}, doAxiosSearch] = useAxios(`qInTitle=${searchString}&page=${page}&pageSize=${limit}&language=${language}`);

    useEffect(() => {
        setNews(null);
        timeoutSearchString ? doAxiosSearch() : doAxios();
    }, [doAxios, doAxiosSearch, timeoutSearchString, page, language]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPage(1);
            setTimeoutSearchString(searchString)
        }, 700);

        return () => clearTimeout(timer);
    }, [searchString]);

    useEffect(() => setPage(1), [language]);

    useEffect(() => {
        if (!response) return;

        const pages = Math.ceil(response.totalResults / limit);
        // set 5 total pages because news resource doesn't give more
        setResponse(response.articles, pages > 5 ? 5 : pages);
    }, [response, limit]);

    useEffect(() => {
        if (!responseSearch) return;

        const pages = Math.ceil(responseSearch.totalResults / limit);
        // set 5 total pages because news resource doesn't give more
        setResponse(responseSearch.articles, pages > 5 ? 5 : pages);
    }, [responseSearch, limit]);
    //
    const setResponse = (responseNews, responsePages) => {
        setNews(responseNews);
        setTotalPages(responsePages);
    };


    return (
        <div className="row">
            {(response || responseSearch) && (
                <>
                    <div className="col-12 mt-3">
                        <Toolbar
                            language={language}
                            languages={languages}
                            page={page}
                            searchString={searchString}
                            totalPages={totalPages}
                            setLanguage={setLanguage}
                            setSearchString={setSearchString}
                            setPage={setPage}/>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            {(loading || loadingSearch) && <div>Loading...</div>}
                            {(!!error || !!errorSearch) && <div>Something wrong...</div>}
                            {news && news.length === 0 && (<div>List Empty</div>)}
                            {news && (news.map((item, index) => {
                                // hard code because need correct url
                                if (item.title.indexOf('%') > -1) return null;

                                return <NewsItem key={item.publishedAt + index} item={item}/>
                            }))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
};

export default News;