// 将收到的消息发送给客户端
module.exports = app => {
    return function* () {
      const self = this;
      const message = this.args[0];
      console.log('chat 控制器打印', message);

      this.socket.emit('res', message);
    };
  };