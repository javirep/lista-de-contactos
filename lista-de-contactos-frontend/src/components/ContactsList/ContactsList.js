import React, { useState, useEffect } from 'react'
import SideButton from "../SideButton/SideButton"
import Pagination from '../Pagination/Pagination.js'
import "./contactsList.css"
import SearchBar from '../SearchBar/SearchBar'

export default function  ContactsList (props) {
    let [contacts, setContacts] = useState([...props.allContacts])
    let [searchBar, setSearchBar] = useState("")
    let [sideButton, setSideButton] = useState("")
    const contactsPerPage = 50
    
    useEffect(() => {
        setContacts(props.allContacts)
    }, [props.allContacts])
    
    function searchBarFilter(array) {
        try{
            return array.filter(contact => {
                if(contact && typeof contact.name == "string"){
                    return contact.name.toLocaleUpperCase().includes(searchBar.toLocaleUpperCase())
                }
            })
        }
        catch(e){
            console.log(e)
        }
    }
    
    function sideButtonFilter(array) {
        try{
            return array.filter(contact => {
                if(contact && typeof contact.name == "string"){
                    return contact.name.charAt(0).toUpperCase() === sideButton
                }
            })
        }
        catch(e){
            console.log(e)
            //return array
        }
    }
    
    function filterContacts() {
        let filteredContacts = contacts;
        
        if(sideButton){
            filteredContacts = sideButtonFilter(filteredContacts);
        }
        
        if(searchBar){
            filteredContacts = searchBarFilter(filteredContacts);
        }
        
        return filteredContacts
    }
    
    function sortContacts(array) {
        try{
            return array.sort((a, b) => {
                if(a && b){
                    if (a.name > b.name) {
                        return 1
                    }
                    if (a.name < b.name) {
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
    
    let filteredContacts = [];
    
    if (contacts && contacts.length > 0) {
        filteredContacts = sortContacts(filterContacts());
    }

    return (
        <div className="contacts-list-container">
            <SearchBar placeholder="Search a contact" change={setSearchBar}/>
            <div style={{ display: "flex" }}>
                <div className="side-button-container">
                    <SideButton click={(letter) => setSideButton(letter)} />
                </div>
                {
                    filteredContacts.length > 0 ?
                        (
                            <div className="names-container">
                                <ul className="contacts-list">
                                    <Pagination itemsPerPage={contactsPerPage}>
                                            {
                                                filteredContacts.map((contact, index) => {
                                                    if(contact){
                                                        return <li key={index}><p onClick={() => props.setContact(contact)}> {contact.name}</p></li>
                                                    }
                                                })
                                            }
                                    </Pagination>
                                </ul>
                            </div>
                        )
                        :
                        <p>No contacts Matching</p>
                }

            </div>
        </div>
    )
}