import React from "react";
import Pagination from "components/pagination";


const Toolbar = ({language, languages, page, searchString, totalPages, setPage, setLanguage, setSearchString}) => {

    return (
        <div className="d-flex toolbar mb-2 align-items-center">
            {totalPages > 1 &&
            (<Pagination currentPage={page} totalPages={totalPages}
                         handleTogglePage={(page) => setPage(page)}/>)}

            <div className="d-flex ml-auto align-items-center">
                <span className="mr-2">Language:</span>
                <select className="custom-select" onChange={e => setLanguage(e.target.value)}>
                    {languages.map(item => (
                        <option key={item} defaultValue={item === language}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            <div className="ml-4 search">
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