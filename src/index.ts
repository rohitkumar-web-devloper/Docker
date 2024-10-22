import dotenv from 'dotenv';
dotenv.config();
import app from "./app";
import { PORT, MONGO_URI } from './constants/Variables';

app.get("/", (req, res) => {
    res.send("<center><h2>Welcome to Devloper world hello</h2></center>")
})
app.listen(PORT, () => {
    console.log("Server is running prosess on Port : " + `http://localhost:${PORT}`)
})