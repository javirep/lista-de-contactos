import React from 'react'

export default function Pagination(props) {

    const { currentPage, numberOfPages, paginate } = props

    return (
        <div>
            <button onClick={() => paginate(currentPage - 1)}>&lt;</button><span>{currentPage} / {numberOfPages} </span><button onClick={() => paginate(currentPage + 1)}>></button>
        </div>
    )
}
