const amqp = require("amqplib");
async function connectToService1() {
  const queueName = "service1";
  const connection = await amqp.connect("amqp://localhost:5672");
  const chanel = connection.createChannel();
  (await chanel).assertQueue(queueName, { durable: true });
  (await chanel).sendToQueue(queueName , Buffer.from("Hello RabbitMQ"))
  console.log("message sent to service1");
}

connectToService1();
