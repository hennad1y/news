import React, {useEffect, useState} from "react";
import classNames from "classnames";

const buildPagination = (totalPages, currentPage) => {
    let arr = [];
    let copy = totalPages;
    let max = currentPage + 3;
    let min = currentPage - 3;

    min = min > 0 ? min : 1;

    do {

        if (copy === totalPages || (max >= copy && copy >= min) || copy === 1) {
            if (currentPage + 3 === copy && copy !== totalPages) {
                arr.push('...')
            } else if (currentPage - 3 === copy && copy !== 1) {
                arr.push('...')
            } else {
                arr.push(copy);

            }
        }

        if (!copy) break;
    } while (copy--);

    return arr.reverse();
};

const Pagination = ({currentPage, totalPages, handleTogglePage}) => {

    const [total, setTotal] = useState(null);

    useEffect(() => {
        if (!totalPages) return;

        setTotal(buildPagination(totalPages, currentPage));
    }, [totalPages, currentPage]);

    const classPrevious = classNames({
        'page-item': true,
        'disabled': currentPage === 1
    });

    const classNext = classNames({
        'page-item': true,
        'disabled': total && currentPage === total.length
    });

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;

        handleTogglePage(page);
    };

    return (
        <>
            {total && (
                <nav aria-label="Page navigation example">
                    <ul className="pagination m-0">
                        <li className={classPrevious} onClick={() => goToPage(currentPage - 1)}>
                            <span className="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </span>
                        </li>

                        {total.map((item, index) => {

                            const classLi = classNames({
                                'page-item': true,
                                'disabled': !Number.isInteger(item),
                                'active': currentPage === item
                            });

                            return (
                                <li className={classLi} key={index} onClick={() => goToPage(item)}>
                                    <span className="page-link">{item}</span>
                                </li>
                            )
                        })}

                        <li className={classNext} onClick={() => goToPage(currentPage + 1)}>
                            <span className="page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </span>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    )
};

export default Pagination;