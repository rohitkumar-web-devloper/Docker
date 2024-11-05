import kafka from "./kafka";
// Initialize Kafka consumer
const consumer = kafka.consumer({ groupId: "light-controller-group" });
export default async function con() {
  await consumer.connect();
  await consumer.subscribe({ topic: "light-control", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message}`, "------------------Consumer");
      // const data = JSON.parse(message?.value);
      if ("on" === "on") {
        console.log("Turning light on");
      } else if ("off" === "off") {
        console.log("Turning light off");
      }
    },
  });
}
