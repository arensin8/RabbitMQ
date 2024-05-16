const amqp = require("amqplib");

async function receiveFromService1() {
  const queueName = "task";

  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    let index = 0;
    await channel.consume(
      queueName,
      (msg) => {
        setTimeout(() => {
          console.log(`${index}:`, msg.content.toString());
          index++;
          // Acknowledge the message manually
          channel.ack(msg);
        }, 2000);
      }
      // { noAck: true } // Uncomment this line if you do not want to acknowledge messages manually
    );

    console.log("Waiting for messages in %s. To exit press CTRL+C", queueName);
  } catch (error) {
    console.error("Error:", error);
  }
}

receiveFromService1();
