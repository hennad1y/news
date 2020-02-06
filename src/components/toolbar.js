import React from "react";
import Pagination from "components/pagination";


const Toolbar = ({language, languages, page, searchString, totalPages, setPage, setLanguage, setSearchString}) => {

    return (
        <div className="d-flex toolbar mb-2 align-items-md-center flex-column flex-md-row">
            {totalPages > 1 &&
            (<Pagination currentPage={page} totalPages={totalPages}
                         handleTogglePage={(page) => setPage(page)}/>)}

            <div className="d-flex ml-md-auto align-items-center mt-2 mt-md-0">
                <span className="mr-2">Language:</span>
                <select className="custom-select" defaultValue={language} onChange={e => setLanguage(e.target.value)}>
                    {languages.map(item => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            <div className="ml-md-4 search mt-2 mt-md-0">
                <i className="fa fa-search"/>
                <input type="text"
                       className="form-control"
                       placeholder="Search"
                       value={searchString}
                       onChange={e => setSearchString(e.target.value)}/>
            </div>
        </div>
    )
};

export default Toolbar;