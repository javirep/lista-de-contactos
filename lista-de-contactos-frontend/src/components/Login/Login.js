import React, { useState, useContext } from "react";
import axiosRequestFunctions from "../../services/Services";
import { AuthContext } from "../../services/authContext";

export default function Login(props) {

    const { setToken, setAuth, } = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleFormSubmit(event) {

        event.preventDefault();

        let validForm = true
        let errorMessage = ""
        let rememberMe = document.getElementById("remember-checkbox").checked

        if (!email || !password) {
            validForm = false
            errorMessage = "Please, fill all the fields"
        }

        if (validForm) {
            const response = await axiosRequestFunctions.login(email, password, rememberMe);
            
            if (response.isLoggedIn) {
                setToken(response.token)
                setAuth(true);
                if(rememberMe){
                    localStorage.setItem("contactsAppToken", response.token)
                }
                props.history.push("/contacts")
            }
            else {
                setAuth(false)
                errorMessage = response.errorMessage
            }
        }
        setErrorMessage(errorMessage)
    };


    function handleChange(event) {
        const { name, value } = event.target;

        if (name === "email") {
            setEmail(value)
        }
        if (name === "password") {
            setPassword(value)
        }
    };

    return (
        <div>
            <h1> Contacts App </h1>
            <form className="form" >
                <div>
                    <p>E-mail</p>
                    <input type="text" name="email" value={email} onChange={(e) => handleChange(e)} />
                </div>

                <div>
                    <p>Password</p>
                    <input type="password" name="password" value={password} onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <input type="checkbox" id="remember-checkbox"/>
                    <span>Remember me</span>
                </div>

                {
                    errorMessage ?
                        <span>{errorMessage}</span>
                        :
                        <></>
                }
                <button onClick={(e) => handleFormSubmit(e)} > Log in </button>
            </form>
        </div>
    );
}
