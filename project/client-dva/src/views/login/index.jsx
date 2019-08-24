import React, { Component } from 'react'

import { Row, Col, Form, Icon, Input, Button, message } from 'antd';

//引入网络发送文件
import * as api from "../../api/user"

//引入connect组件连接仓库使用
import { connect } from "dva"

//引入存储的值

import { setToken } from "../../utils/createToken"

//装饰器语法

const mapStateToProps = (state) => {
    return {
        token: state.user.token
    }
}

@connect(mapStateToProps)
@Form.create({ name: 'normal_login' })


class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //发送登录的网络请求
                api.Login(values).then(res => {
                    if (res.data.code) {
                        let token = res.data.token;
                        let uid = res.data.uid;
                        let opt = {
                            token,
                            uid
                        }
                        setToken(opt);

                        this.props.dispatch({
                            type: "user/changeToken",
                            token: res.data.token,
                            uid: res.data.uid
                        })
                        message.success(res.data.msg, 1, () => {
                            this.props.history.push("/main/home")
                        })
                    } else {
                        message.error(res.data.msg, 1, () => {
                            this.props.form.setFieldsValue({ username: "", password: "" })
                        })
                    }
                })
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>登录页面</h1>
                <Row>
                    <Col xs={{ span: 10, offset: 7 }}>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                    initialValue: "陈强"
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                    initialValue: "111"
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>

                            </Form.Item>
                        </Form>
                    </Col>

                </Row>
            </div>
        )
    }
    componentDidMount(){
        console.log("会不会");
        this.props.dispatch({
            type:"list/changFlag",
            flag:false
        })
    }
}



export default Login;

