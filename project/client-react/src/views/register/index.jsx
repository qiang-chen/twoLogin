import React from 'react'
import {
    Form,
    Input,
    Row,
    Col,
    Button,
    message
} from 'antd';

//引入所有的网络请求
import * as api from "@/api/user"

@Form.create({ name: 'register' })

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
               //发送网络请求
               api.Register(values).then(res=>{
                   if(res.data.code===0){
                    message.error(res.data.msg, 1, ()=>{
                        this.props.form.setFieldsValue({username:"",password:"",confirm:""})
                    })
                   }else{
                    message.success(res.data.msg, 1, () => {
                        //跳到主页路由
                        this.props.history.push("/login")
                    })
                   }
               })
            }
        });
    };
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div>
                <h1 style={{textAlign:"center"}}>注册页面</h1>
                <Row>
                    <Col xs={{ span: 10, offset: 7 }}>
                        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                            <Form.Item label="userName">
                                {getFieldDecorator('username', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your userName!',
                                        },
                                    ],
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="Password" hasFeedback>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                        {
                                            validator: this.validateToNextPassword,
                                        },
                                    ],
                                    initialValue:"111"
                                })(<Input.Password />)}
                            </Form.Item>
                            <Form.Item label="Confirm Password" hasFeedback>
                                {getFieldDecorator('confirm', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        {
                                            validator: this.compareToFirstPassword,
                                        },
                                    ],
                                    initialValue:"111"
                                })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">
                                    注册
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}


//const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

//export default WrappedRegistrationForm;

export default RegistrationForm;