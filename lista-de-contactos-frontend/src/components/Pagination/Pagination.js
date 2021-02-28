import React, {useState} from 'react'
import "./pagination.css"

export default function Paginator(props) {
    //props.children => should be the array with the items to indexate. 
    //props.itemsPerPage => should be the number of elements that should be displayed.
    let { itemsPerPage } = props
    let defaultItemsPerPage = 10
    if(!itemsPerPage){
        itemsPerPage = defaultItemsPerPage
    }
    
    let items = props.children
    let[currentPage, setCurrentPage] = useState(1)
    
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const numberOfPages = Math.ceil(items.length / itemsPerPage)

    if(currentPage > numberOfPages){
        setCurrentPage(numberOfPages)
    }

    let itemsToShow = items.slice(indexOfFirstItem, indexOfLastItem)

    let prevPageButtonStyle= {};
    if(currentPage === 1){
        prevPageButtonStyle = {visibility: 'hidden'}
    }

    let nextPageButtonStyle= {};
    if(currentPage === numberOfPages){
        nextPageButtonStyle = {visibility: 'hidden'}
    }

    function pageHandler(nextPage){
        if(nextPage < 1){
            return false
        } 
        if (nextPage > numberOfPages){
            return false
        }
        setCurrentPage(nextPage)
    }

    if (props.resetPagination){
        setCurrentPage(1)
    }
    
    return (
        <div style={{width: "100%"}}>
            <div style = {props.containerStyle}>
                {
                itemsToShow.map(element => {
                    return element
                })
                }
            </div>
            <div  className="pagination-container">
                <button onClick={()=> pageHandler(currentPage - 1)} style={prevPageButtonStyle}> &lt; </button>
                <span>{currentPage} / {numberOfPages}</span>
                <button onClick={()=> pageHandler(currentPage + 1)} style={nextPageButtonStyle}> &gt; </button>
            </div>
        </div>
    )
}