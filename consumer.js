const amqp = require("amqplib");

async function receiveFromService1() {
  const queueName = "service1";
  const connection = await amqp.connect("amqp://localhost:5672");
  const chanel = connection.createChannel();
  (await chanel).assertQueue(queueName, { durable: true });
  (await chanel).consume(queueName, (msg) => {
    console.log(msg.content.toString());
  });
}

receiveFromService1();
