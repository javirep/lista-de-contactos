import React, { Component } from 'react'
import ContactsList from "./ContactsList"
import ContactDetails from "./ContactDetails"

export default class Contacts extends Component {

    state = {
        contact: {}
    }

    showContact(contact) {
        this.setState({
            contact
        })
    }

    render() {
        return (
            <div className="contacts-container">
                <ContactsList showContact={(contact) => this.showContact(contact)} />
                <ContactDetails contact={this.state.contact} />
            </div>
        )
    }
}
