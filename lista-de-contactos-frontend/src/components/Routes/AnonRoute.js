import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../services/authContext";

// El componente <AnonRoute /> deja acceder si auth es false. Si auth es true redirije a "/contacts".

function AnonRoute({ component: Component, ...rest }) {

    const { auth } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) => !auth ? <Component {...props} /> : <Redirect to="/contacts" />}
        />
    );
}

export default AnonRoute;