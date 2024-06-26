const amqp = require("amqplib");

async function sendMsgToTask() {
  const queueName = "task";

  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    channel.sendToQueue(
      queueName,
      Buffer.from("Hello RabbitMQ"),
      //this is for saving data on disk if sth happens (restart rabbitmq , ...)
      {
        persistent: true,
      }
    );
    console.log("Message sent to service");
    setTimeout(() => {
      connection.close();
    }, 1000);
  } catch (error) {
    console.error("Error:", error);
  }
}

setInterval(() => {
  sendMsgToTask();
}, 1000);
