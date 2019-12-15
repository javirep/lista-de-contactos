import React, { Component } from 'react';
import axiosRequestFunctions from "../services/Services";
import ContactCard from './ContactCard';
import Pagination from "./Pagination"

export default class ContactDetails extends Component {

    state = {
        allContacts: [],
        searchBar: "",
        currentPage: 1,
        contactsPerPage: 20
    }

    async componentDidMount() {
        const response = await axiosRequestFunctions.getContacts(this.props.token);

        this.setState({
            allContacts: response.contacts
        })
    }

    populateMyConnections() {
        const { connections } = this.props.contact;
        const { allContacts } = this.state;
        const myConnections = []

        if (allContacts.length > 0) {
            connections.map(connection => {
                myConnections.push(allContacts.filter(contact => connection === contact.id)[0])
            })
        }
        return myConnections
    }

    handleChange(event) {
        const { value, name } = event.target;
        this.setState({
            currentPage: 1,   // if we dont set currentPage to 1 and the user filters something while being in page 4 may happen that no contacts are displayed
            [name]: value
        })
    }

    searchBarFilter(array) {
        const { searchBar } = this.state

        return array.filter(contact => contact.name.includes(searchBar))
    }

    paginate = currentPage => {
        if (currentPage > 0) {
            this.setState({
                currentPage
            })
        }
    }

    render() {

        const { currentPage, contactsPerPage } = this.state

        let myConnections = this.searchBarFilter(this.populateMyConnections());

        const indexOfLastContact = currentPage * contactsPerPage;
        const indexOfFirstContact = indexOfLastContact - contactsPerPage;
        const numberOfPages = Math.ceil(myConnections.length / contactsPerPage)

        myConnections = myConnections.slice(indexOfFirstContact, indexOfLastContact);

        return (
            <div className="contact-details-container">
                <input type="text" placeholder="Search a contact" name="searchBar" value={this.state.searchBar} onChange={(e) => this.handleChange(e)} />
                <h1>{this.props.contact.name}</h1>
                <ul>
                    {
                        myConnections ?
                            (
                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                    {
                                        myConnections.map((connection, index) => {
                                            return <ContactCard connection={connection} />
                                        })
                                    }
                                    <br />
                                    <Pagination currentPage={currentPage} numberOfPages={numberOfPages} paginate={this.paginate} />
                                </div>
                            )
                            :
                            <p> This user has no connections. </p>
                    }
                </ul>
            </div>
        )
    }
}
