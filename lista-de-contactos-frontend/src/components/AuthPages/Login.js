import React, { useState, useContext } from "react";
import axiosRequestFunctions from "../../services/Services";
import { AuthContext } from "../../services/authContext";
import { Link } from "react-router-dom"

export default function Login() {

    const { setToken, setAuth, } = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleFormSubmit(event) {

        event.preventDefault();

        let validForm = true
        let errorMessage = ""

        if (!email || !password) {
            validForm = false
            errorMessage = "Por favor, rellene todos los campos"
        }

        if (validForm) {
            const response = await axiosRequestFunctions.login(email, password);

            if (response.isLoggedIn) {
                console.log("token received from Backend: " + response.token)
                setToken(response.token)
                setAuth(true);
            }
            else {
                setAuth(true)
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
        <form className="form" >
            <div>
                <p>E-mail</p>
                <input type="text" name="email" value={email} onChange={(e) => handleChange(e)} />
            </div>

            <div>
                <p>Password</p>
                <input type="password" name="password" value={password} onChange={(e) => handleChange(e)} />
            </div>

            {
                errorMessage ?
                    <span>{errorMessage}</span>
                    :
                    <></>
            }
            <Link to="/contacts" className="button" onClick={(e) => handleFormSubmit(e)} > Log in </Link>
        </form>
    );
}
