import React, { Component } from 'react'

import {connect} from "dva"

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    render() {
        return (
            <div>
                this is page home
                <ul>
                    {this.props.list.map(item=>{
                        return <li key={item.id}>{item.name}</li>
                    })}
                </ul>
            </div>
        )
    }
    componentDidMount(){
        this.props.dispatch({
            type:"list/getList",
            payload:{
                limit:5,
                pages:0
            }
        })
    }
    static getDerivedStateFromProps(nextProps){
        if(nextProps.flag){
            nextProps.history.push("/login")
        }
        return {
            
        }
    }
}

const mapStateToProps=state=>{
    return {
        list:state.list.list,
        flag:state.list.flag
    }
}

Home=connect(mapStateToProps)(Home)
