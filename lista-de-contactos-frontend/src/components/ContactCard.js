import React, { Component } from 'react'

export default class extends Component {
    render() {
        return (
            <div>
                <img src={this.props.connection.avatar} alt="avatar picture" />
                <h3>{this.props.connection.name}</h3>
            </div>
        )
    }
}
