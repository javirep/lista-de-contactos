import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../services/Auth";

// El componente <PrivateRoute /> recibe como argumento un objeto con las propiedades: isLoggedIn y el resto de las props, y además un componente en la key component

function PrivateRoute({ component: Component, ...rest }) {

    let auth;
    Auth().then(response => auth = response)

    return (
        <Route
            {...rest}
            render={(props) => auth ? <Component {...props} /> : <Redirect to="/" />}
        />
    );
}

export default PrivateRoute;
