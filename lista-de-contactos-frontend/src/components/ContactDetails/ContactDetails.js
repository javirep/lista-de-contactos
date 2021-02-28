import React, { useState } from 'react';
import ContactCard from '../ContactCard/ContactCard.js';
import Pagination from "../Pagination/Pagination.js"
import "./contactDetails.css";
import SearchBar from '../SearchBar/SearchBar'

export default function ContactDetails (props) {

    let [searchBar, setSearchBar] = useState("")
    const { allContacts } = props
    const contactsPerPage = 20;

    function populateMyConnections() {
        const { connections } = props.contact;
        const myConnections = []

        if (allContacts.length > 0) {
            connections.forEach(connection => {
                myConnections.push(allContacts[connection])
            })
        }
        return myConnections
    }

    function searchBarFilter(array) {
        try{
            return array.filter(contact => {
                if(contact){
                    return contact.name.toLocaleUpperCase().includes(searchBar.toLocaleUpperCase())
                }
            })
        }
        catch(e){
            console.log(e)
            return array
        }
    }

    function sortContacts(array) {
        try{
            return array.sort((a, b) => {
                if(a && b){
                    if (a.name > b.name) {
                        return 1
                    }
                    else if (a.name < b.name) {
                        return -1
                    }
                    else { return 0 }
                }
            })
        }
        catch(e){
            console.log(e)
            return array
        }
    }

    let myConnections = sortContacts(searchBarFilter(populateMyConnections()));

    return (
        <div className="contact-details-container">
            <div className ="contact-details-header">
                <div className ="contact-info-container">
                    <img src={props.contact.avatar} alt="contact avatar"/>
                    <h1>{props.contact.name}</h1>
                </div>

                <SearchBar placeholder="Search a connection" change={setSearchBar}/>
            </div>
            <ul>
                {
                    (myConnections && myConnections.length)?
                        (
                            <div >
                                <Pagination itemsPerPage={contactsPerPage} containerStyle={{ display: "flex", flexWrap: "wrap", justifyContent:"center" }}>
                                    {
                                        myConnections.map((connection, index) => {
                                            if(connection){
                                                return <ContactCard connection={connection} key={index}/>
                                            }
                                        })
                                    }
                                </Pagination>
                            </div>
                        )
                        :
                        <p> This user has no connections matching. </p>
                }
            </ul>
        </div>
    )
}
