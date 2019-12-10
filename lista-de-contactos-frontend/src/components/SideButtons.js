import React, { Component } from 'react'

export default class SideButtons extends Component {

    liftStateUp(event) {
        this.props.handleChange(event)
    }

    render() {
        const abcArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        return (
            <div>
                <button value="" name="sideButton" onClick={(e) => this.liftStateUp(e)}>All</button>
                {
                    abcArray.map(letter => {
                        return <button value={letter} name="sideButton" onClick={(e) => this.liftStateUp(e)} >{letter}</button>
                    })
                }
            </div>
        )
    }
}
