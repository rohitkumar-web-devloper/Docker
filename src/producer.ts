import kafka from "./kafka";

async function init() {
    const producer = kafka.producer();
    console.log("Connecting producer")
    await producer.connect()
    console.log("Producer Connected successfully");
    await producer.send({
        topic: "rider-updates",
        messages: [
            {
                key: "name", value: "Tony Stark" , partition:0 
            }
        ]
    })
await producer.disconnect()
}
init()