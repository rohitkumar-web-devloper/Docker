import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { PORT } from "./constants/Variables";
import requireDir from "require-dir";
import kafka from "./kafka";
import client from "prom-client";
import redisClient from "./Redis";
import responseTime from "response-time";
import { createLogger, transports } from "winston";
import LokiTransport from "winston-loki";
requireDir("./routes");
requireDir("./controllers", { recurse: true });
const options = {
  transports: [
    new LokiTransport({
      host: "http://127.0.0.1:3100",
    }),
  ],
};
const logger = createLogger(options);
async function kaf() {
  const admin = kafka.admin();
  console.log("Admin Connecting....");
  admin.connect();
  console.log("Admin Connection successfully");
  console.log("creating topin [riders updates]");
  //   await admin.createTopics({
  //     topics: [
  //       {
  //         topic: "light-control",
  //         numPartitions: 2,
  //       },
  //     ],
  //   });

  console.log("Topic created Success [rider-updates]");
  console.log("Disconnecting admin..");
  await admin.disconnect();
}
// kaf();
// produ();
// con();
(async () => {
  redisClient.on("error", (error) => {
    console.log(error, "Redis Connection Error");
  });
  await redisClient.connect();
  console.log("Redis Connected");
})();

// Prometheus connection
const collectDefaultMatric = client.collectDefaultMetrics();

const reqResTime = new client.Histogram({
  name: "http_express_req_res_time",
  help: "This tell how much time taken by req & res",
  labelNames: ["method", "route", "status_code"],
  buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000],
});
app.use(
  responseTime((req, res, time) => {
    reqResTime
      .labels({
        method: req.method,
        route: req.url,
        status_code: res.statusCode,
      })
      .observe(time);
  })
);
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.get("/", (req, res) => {
  logger.info("Req came from / Route");
  res.send("<center><h2>Welcome to Devloper world...Ram</h2></center>");
});
app.get("/slow", (req, res) => {
  logger.error("Req came from /slow Route");
  res.json({ type: "success", name: "ROhit" });
});

app.listen(PORT, () => {
  console.log(
    "Server is running prosess on Port : " + `http://localhost:${PORT}`
  );
});
