const amqp = require('amqplib/callback_api');

const sendMessage = (msg) => {
  amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }

      const queue = 'tasks';

      channel.assertQueue(queue, {
        durable: false
      });

      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
    });

    setTimeout(() => {
      connection.close();
    }, 500);
  });
};

module.exports = sendMessage;
