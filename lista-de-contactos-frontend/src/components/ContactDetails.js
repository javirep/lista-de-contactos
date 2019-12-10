import React, { Component } from 'react';
import axiosRequestFunctions from "../services/Services";
import ContactCard from './ContactCard';

export default class ContactDetails extends Component {

    state = {
        allContacts: [],
        searchBar: ""
    }

    async componentDidMount() {
        const allContacts = await axiosRequestFunctions.getContacts();

        this.setState({
            allContacts
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
            [name]: value
        })
    }

    searchBarFilter(array) {
        const { searchBar } = this.state

        return array.filter(contact => contact.name.includes(searchBar))
    }

    render() {
        const myConnections = this.searchBarFilter(this.populateMyConnections());

        return (
            <div className="contact-details-container">
                <input type="text" name="searchBar" value={this.state.searchBar} onChange={(e) => this.handleChange(e)} />
                <h1>{this.props.contact.name}</h1>
                <ul>
                    {
                        myConnections ?
                            (
                                myConnections.map((connection, index) => {
                                    return <ContactCard connection={connection} />
                                })
                            )
                            :
                            <p> This user has no connections. </p>
                    }
                </ul>
            </div>
        )
    }
}
