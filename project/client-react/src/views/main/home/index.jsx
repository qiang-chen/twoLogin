import React, { Component } from 'react'

import {connect} from "dva"

const mapStateToProps=(state)=>{
    return {
        list:state.list.list,
        flag:state.list.flag
    }
}

@connect(mapStateToProps)

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            limit:5,
            pages:0,
            flag:false
        }
    }
    render() {
        return (
            <div>
                this is page home
                <ul>
                    {this.props.list.length&&this.props.list.map(item=>{
                        return <li key={item.id}>{item.name}</li>
                    })}
                </ul>

                <button onClick={()=>{
                    this.setState({
                        pages:this.state.pages+=1
                    },()=>{
                        this.props.dispatch({
                            type:"list/getList",
                            payload:{
                                limit:this.state.limit,
                                pages:this.state.pages
                            }
                        })
                    })
                }}>点击切换下一页数据</button>
            </div>
        )
    }
    componentDidMount(){
        //调用仓库的异步方法发送异步请求
        this.props.dispatch({
            type:"list/getList",
            payload:{
                limit:this.state.limit,
                pages:this.state.pages
            }
        })
    }
    static getDerivedStateFromProps(nextprops,nextstate){
        console.log(nextprops.flag,"这是什么");
        if(nextprops.flag){
            alert("没权限")
            //nextprops.history.push("/login")
        }
        return {

        }
    }
}


export default Home;