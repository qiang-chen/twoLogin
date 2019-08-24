import React, { Component } from 'react'

import { Row, Col, Form, Icon, Input, Button, message } from 'antd';


//引入connect组件使用dva仓库
import { connect } from "dva"


//引入本地存储值
import { setSession } from "@/utils/creatToken"

//引入网络发送文件
import * as api from "@/api/user"

const mapStateToProps = function (state) {
    return {
        token: state.user.token
    }
}

//装饰器语法

@Form.create({ name: 'normal_login' })
@connect(mapStateToProps)
class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //发送登录的网络请求
                api.Login(values).then(res => {
                    //console.log(res.data);
                    if (res.data.code) {
                        //顺带存到本地
                        let data = {
                            token: res.data.token,
                            uid: res.data.uid
                        }

                        //跳到主页路由
                        //console.log(res.data.token);
                        //调用仓库方法将这个token存到仓库里面去
                        this.props.dispatch({
                            type: "user/changeToken",
                            token: res.data.token
                        })
                        this.props.dispatch({
                            type: "user/changeUid",
                            uid: res.data.uid
                        })

                        //改变flag
                        this.props.dispatch({
                            type: "user/changeFlag",
                            data: false
                        })
                        setSession(data)
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
    componentDidMount() {
        //console.log(this.props.token)
    }
}



// const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

// export default WrappedNormalLoginForm;

export default Login

