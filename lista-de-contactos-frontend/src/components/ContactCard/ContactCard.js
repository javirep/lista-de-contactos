import React from 'react'
import "./contactCard.css"

export default function ContactCard(props) {
    return (
        <div className="card-container">
            <img src={props.connection.avatar} alt="avatar" />
            <h3>{props.connection.name}</h3>
        </div >
    )
}