import React, {useEffect, useState} from "react";
import NewsItem from "components/cabinet-news-item";
import useAxios from "hooks/useAxios";
import Pagination from "components/pagination";

const News = () => {

    const [news, setNews] = useState(null);
    const [page, setPage] = useState(1);
    const [limit] = useState(20);
    const [language] = useState('en');
    const [searchString, setSearchString] = useState('');
    const [totalPages, setTotalPages] = useState(null);
    const [{response, loading, error}, doAxios] = useAxios(`q=news&page=${page}&pageSize=${limit}&language=${language}`);
    const [{response: responseSearch, loading: loadingSearch, error: errorSearch}, doAxiosSearch] = useAxios(`qInTitle=${searchString}&page=${page}&pageSize=${limit}&language=${language}`);

    useEffect(() => {
        if (searchString) return;

        setNews(null);
        doAxios();
    }, [doAxios, searchString, page]);

    useEffect(() => {
        if (!searchString) return;

        const timer = setTimeout(() => {
            setNews(null);
            doAxiosSearch();
        }, 1000);

        return () => clearTimeout(timer);
    }, [doAxiosSearch, searchString, page]);

    useEffect(() => {
        if (!response) return;

        setNews(response.articles);
        // set max 5 total pages because news resource doesn't give more
        const pages = Math.ceil(response.totalResults / limit);
        setTotalPages(pages > 5 ? 5 : pages);
        // setTotalPages(Math.ceil(response.totalResults / limit))
    }, [response, limit]);

    useEffect(() => {
        if (!responseSearch) return;

        setNews(responseSearch.articles);
        // set 5 total pages because news resource doesn't give more
        const pages = Math.ceil(responseSearch.totalResults / limit);
        setTotalPages(pages > 5 ? 5 : pages);
        // setTotalPages(Math.ceil(responseSearch.totalResults / limit))
    }, [responseSearch, limit, doAxiosSearch]);


    const handleGetNews = (page) => setPage(page);

    return (
        <div className="row">
            {(loading || loadingSearch) && !response && <div>Loading...</div>}
            {(!!error || !!errorSearch) && <div>Something wrong...</div>}
            {response && (
                <>
                    <div className="col-12 mt-3">
                        <div className="d-flex toolbar">
                            {totalPages > 1 && (
                                <Pagination currentPage={page} totalPages={totalPages} getNewsByPage={handleGetNews}/>)}
                            <fieldset className="form-group ml-auto search">
                                <i className="fa fa-search"/>
                                <input type="text"
                                       className="form-control"
                                       placeholder="Search"
                                       value={searchString}
                                       onChange={e => setSearchString(e.target.value)}/>
                            </fieldset>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            {news && news.length === 0 && (<div>List Empty</div>)}
                            {news && (news.map((item, index) => <NewsItem key={index} item={item}/>))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
};

export default News;