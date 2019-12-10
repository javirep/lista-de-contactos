import React, { Component } from 'react'
import axiosRequestFunctions from "../services/Services"
import SideButtons from "./SideButtons"

export default class ContactsList extends Component {

    state = {
        contacts: [],
        searchBar: "",
        sideButton: "",
        contactId: ""
    }

    async componentDidMount() {
        const contacts = await axiosRequestFunctions.getContacts();

        this.setState({
            contacts
        })
    }

    handleChange(event) {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        })
    }

    searchBarFilter(array) {
        const { searchBar } = this.state

        return array.filter(contact => contact.name.includes(searchBar))
    }

    sideButtonFilter(array) {
        const { sideButton } = this.state

        return array.filter(contact => contact.name.indexOf(sideButton.toUpperCase()) === 0)
    }

    filterContacts() {
        const { contacts } = this.state;

        return this.searchBarFilter(this.sideButtonFilter(contacts))
    }

    sortContacts(array) {
        return array.sort((a, b) => {
            if (a.name > b.name) {
                return 1
            }
            if (a.name < b.name) {
                return -1
            }
            else { return 0 }
        })
    }

    showContact(contact) {
        this.props.showContact(contact)
    }

    render() {
        const { contacts, searchBar } = this.state;

        const filteredContacts = this.sortContacts(this.filterContacts());

        if (contacts.lenght > 0) {
            filteredContacts = contacts.filter(contact => {
                return contact.name.includes(searchBar)
            })
        }


        return (
            <div className="contacts-list-container">
                <input type="text" name="searchBar" value={searchBar} onChange={(e) => this.handleChange(e)} />
                <div style={{ display: "flex" }}>

                    <SideButtons handleChange={(e) => this.handleChange(e)} />
                    {
                        contacts.length > 0 ?
                            (
                                <ul>
                                    {
                                        filteredContacts.map((contact, index) => {
                                            return <li key={index}><button onClick={() => this.showContact(contact)}> {contact.name}</button></li>
                                        })
                                    }
                                </ul>
                            )
                            :
                            <p>Loading ...</p>
                    }
                </div>
            </div>
        )
    }
}
