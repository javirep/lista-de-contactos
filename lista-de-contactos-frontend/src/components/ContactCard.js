import React, { Component } from 'react'

export default class extends Component {
    render() {
        return (
            <div style={{ margin: "5%", width: "150px" }}>
                <img src={this.props.connection.avatar} alt="avatar picture" />
                <h3>{this.props.connection.name}</h3>
            </div >
        )
    }
}
