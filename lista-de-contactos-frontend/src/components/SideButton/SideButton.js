import React from 'react'
import "./sideButton.css"

export default function  SideButtons (props) {

    const abcArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    return (
        <div>
            <button className="side-button" value="" name="sideButton" onClick={() => props.click("")}>All</button>
            {
                abcArray.map((letter, index) => {
                    return <button className="side-button" value={letter} name="sideButton" onClick={() => props.click(letter)} key={index}>{letter}</button>
                })
            }
        </div>
    )
}
