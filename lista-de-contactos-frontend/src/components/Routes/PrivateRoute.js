import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../services/authContext";

// El componente PrivateRoute deja acceder al componente si Auth es true. Si no redirije a "/" (que es el log in).

function PrivateRoute({ component: Component, isLoggedIn, ...rest }) {

    const { auth } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) => auth ? <Component {...props} /> : <Redirect to="/" />}
        />
    );
}

export default PrivateRoute;