import React from 'react'

export default function Pagination(props) {

    const { currentPage, numberOfPages, paginate } = props

    return (
        <div>
            <button onClick={() => paginate(currentPage - 1)}>&lt;</button>
            <span>{currentPage} / {numberOfPages} </span>
            {
                currentPage < numberOfPages ?
                    <button onClick={() => paginate(currentPage + 1)}>></button>
                    :
                    null
            }
        </div>
    )
}
