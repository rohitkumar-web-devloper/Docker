import dotenv from 'dotenv';
dotenv.config();
import app from "./app";
import { PORT } from './constants/Variables';
import requireDir from "require-dir"
import kafka from './kafka';
requireDir("./routes");
requireDir("./controllers", { recurse: true });
import redisClient from './Redis';
async function init() {
    const admin = kafka.admin();
    console.log("Admin Connecting....");
    admin.connect()
    console.log("Admin Connection successfully");
    console.log("creating topin [riders updates]");
    await admin.createTopics({
        topics: [
            {
                topic: "rider-updates",
                numPartitions: 2
            }
        ]
    });

    console.log("Topic created Success [rider-updates]");
    console.log("Disconnecting admin..");
    await admin.disconnect()
}
// init()
(
    async () => {
        redisClient.on("error", (error) => {
            console.log(error, "Redis Connection Error");
        })
        await redisClient.connect()
        console.log("Redis Connected");
    }
)()
app.get("/", (req, res) => {
    res.send("<center><h2>Welcome to Devloper world...Ram</h2></center>")
})

app.listen(PORT, () => {
    console.log("Server is running prosess on Port : " + `http://localhost:${PORT}`)
})