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

        if (!email || !password) {
            validForm = false
            errorMessage = "Por favor, rellene todos los campos"
        }

        if (validForm) {
            const response = await axiosRequestFunctions.login(email, password);

            if (response.isLoggedIn) {
                setToken(response.token)
                setAuth(true);
                props.history.push("/contacts")
            }
            else {
                setAuth(false)
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
            <button onClick={(e) => handleFormSubmit(e)} > Log in </button>
        </form>
    );
}
