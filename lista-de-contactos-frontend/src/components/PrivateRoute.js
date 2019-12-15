import React, { useState, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../services/authContext";

// El componente <PrivateRoute /> recibe como argumento un objeto con las propiedades: isLoggedIn y el resto de las props, y además un componente en la key component

function PrivateRoute({ component: Component, isLoggedIn, ...rest }) {

    const { auth } = useContext(AuthContext);
    console.log("auth privRoute: " + auth)

    return (
        <Route
            {...rest}
            render={(props) => auth ? <Component {...props} /> : <Redirect to="/" />}
        />
    );
}

export default PrivateRoute;