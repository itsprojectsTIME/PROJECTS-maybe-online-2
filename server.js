const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Dark Nova!');
});

app.get("/about", (req, res) => {
    res.json({
        message: "Hello, World! I am Dark Nova, the creator of this API. AND I DONT SUCK AT CODING",
        creator: "Dark Nova",
        status: "API is working!",
        id: "1",
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
});
app.get("/status", (req, res) => {
    res.json({
    status: "Online",
    uptime: process.uptime(),
    version: "1.0.0"
});

});
app.post("/messages", (req, res) => {
    const message = req.body.message;
    res.json({
    received: true,
    message: message
});

});

app.listen(3000, () => {
    console.log("API running at http://localhost:3000");
});