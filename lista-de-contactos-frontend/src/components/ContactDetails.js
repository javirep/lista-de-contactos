import React, { Component } from 'react'

export default class ContactDetails extends Component {
    render() {
        console.log("new props: ")
        console.log(this.props.contact)
        return (
            <div className="contact-details-container">
                <h1>
                    {this.props.contact.name}
                </h1>
            </div>
        )
    }
}
