import dotenv from 'dotenv';
dotenv.config();
import app from "./app";
import { PORT, MONGO_URI } from './constants/Variables';
import requireDir from "require-dir"
app.get("/", (req, res) => {
    res.send("<center><h2>Welcome to Devloper world...</h2></center>")
}) 
requireDir("./routes");
requireDir("./controllers", {recurse: true});

app.listen(PORT, () => {
    console.log("Server is running prosess on Port : " + `http://localhost:${PORT}`)
})