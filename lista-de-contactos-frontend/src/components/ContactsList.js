import React, { Component } from 'react'
import axiosRequestFunctions from "../services/Services"
import SideButtons from "./SideButtons"
import Pagination from './Pagination'

export default class ContactsList extends Component {

    state = {
        contacts: [],
        searchBar: "",
        sideButton: "",
        contactId: "",
        currentPage: 1,
        contactsPerPage: 50
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

    paginate = currentPage => {
        if (currentPage > 0) {
            this.setState({
                currentPage
            })
        }
    }

    render() {
        const { contacts, searchBar, currentPage, contactsPerPage } = this.state;

        let filteredContacts = this.sortContacts(this.filterContacts());

        // Getting current posts:
        const indexOfLastContact = currentPage * contactsPerPage;
        const indexOfFirstContact = indexOfLastContact - contactsPerPage;
        const numberOfPages = Math.ceil(filteredContacts.length / contactsPerPage)

        filteredContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);


        return (
            <div className="contacts-list-container">
                <input type="text" name="searchBar" value={searchBar} onChange={(e) => this.handleChange(e)} />
                <div style={{ display: "flex" }}>

                    <SideButtons handleChange={(e) => this.handleChange(e)} />
                    {
                        filteredContacts.length > 0 ?
                            (
                                <div>
                                    <ul>
                                        {
                                            filteredContacts.map((contact, index) => {
                                                return <li key={index}><button onClick={() => this.showContact(contact)}> {contact.name}</button></li>
                                            })
                                        }
                                    </ul>
                                    <Pagination currentPage={currentPage} numberOfPages={numberOfPages} paginate={this.paginate} />
                                </div>
                            )
                            :
                            <p>No contacts Matching</p>
                    }

                </div>
            </div>
        )
    }
}
