import React, { useState, useContext, useEffect } from 'react'
import axiosRequestFunctions from "../services/Services";
import ContactsList from "./ContactsList/ContactsList"
import ContactDetails from "./ContactDetails/ContactDetails.js"
import { AuthContext } from "../services/authContext"

export default function Contacts() {

    const { token } = useContext(AuthContext);
    var [allContacts, setAllContacts] = useState([]) 
    var [contact, setContact] = useState("")

    useEffect(function () {
        async function asyncFunction (){
            const response = await axiosRequestFunctions.getContacts(token);
            let { contacts } = response
            setAllContacts( contacts )
        }

        asyncFunction()

    }, [])
    
    return (
        <div className="contacts-container">
            <ContactsList token={token} setContact={setContact} allContacts={allContacts}/>
            {contact ?
                <ContactDetails contact={contact} token={token} allContacts={allContacts} />
                :
                <></>
            }
        </div>
    )
}