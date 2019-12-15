import React, { useState, useContext } from 'react'
import ContactsList from "./ContactsList"
import ContactDetails from "./ContactDetails"
import { AuthContext } from "../services/authContext"

export default function Contacts() {

    const { token } = useContext(AuthContext);
    console.log("token in contacts: " + token);
    var [contact, setContact] = useState("")

    return (
        <div className="contacts-container">
            <ContactsList token={token} setContact={setContact} />
            {contact ?
                <ContactDetails contact={contact} token={token} />
                :
                <></>
            }
        </div>
    )
}

