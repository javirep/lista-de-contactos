import React from 'react'

function SearchBar(props) {
    console.log(props)
    return (
        <input className="search-bar" placeholder={props.placeholder} onChange={(event) => props.change(event.currentTarget.value)}/>
    )
}

export default SearchBar
