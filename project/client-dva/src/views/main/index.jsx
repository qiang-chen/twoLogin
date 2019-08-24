import React, { Component } from 'react'

import RouteView from "../../routes/RouteView"

export default class Main extends Component {
    render() {
        return (
            <div>
                <RouteView children={this.props.children}></RouteView>
            </div>
        )
    }
}
