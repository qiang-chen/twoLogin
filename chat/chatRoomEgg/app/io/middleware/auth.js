// 这个中间件的作用是提示用户连接与断开的，
//连接成功的消息发送到客户端，断开连接的消息在服务端打印
module.exports = app => {
    return function* (next) {
        
        //this.socket.emit('res', '用户已连接');
        this.socket.emit('err', '用户已退出');
        yield* next;
        console.log('disconnection!');
       
    };
};

