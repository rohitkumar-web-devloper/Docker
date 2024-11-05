import kafka from "./kafka";
const producer = kafka.producer();
export default async function produ() {
    console.log("Connecting producer")
    await producer.connect();
    await producer.send({
      topic: 'light-control', // The topic where messages will be sent
      messages: [
        { value: JSON.stringify({ deviceId: 'light_1', command: 'on' }) },
      ],
    });
    console.log('Message sent successfully');
    await producer.disconnect();
}