import React, { Component } from 'react';
import axiosRequestFunctions from "../services/Services";

export default class Auth extends Component {

    state = {
        isLoggedIn: false
    }

    componentDidMount() {
        const isLoggedIn = await axiosRequestFunctions.getMe()

        this.setState({
            isLoggedIn
        })
    }

    Auth = (WrappedComponent) => {
        return (
            <WrappedComponent isLoggedIn={this.state.isLoggedIn} {...this.props} />
        )
    }
}
