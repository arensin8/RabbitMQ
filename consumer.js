const amqp = require("amqplib");

async function receiveFromService1() {
  const queueName = "task";
  const connection = await amqp.connect("amqp://localhost:5672");
  const chanel = connection.createChannel();
  let index = 0;
  (await chanel).assertQueue(queueName, { durable: true });
  (await chanel).consume(
    queueName,
    (msg) => {
      console.log(`${index}:`, msg.content.toString());
      index++;
    },
    //it means consumer confirmes messages
    { noAck: true }
  );
}

receiveFromService1();
