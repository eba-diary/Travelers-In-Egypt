const express = require("express");
const cors = require("cors");
const app = express()
const expressRateLimiter = require("express-rate-limit");

const MINUTE = 60 * 1000;

// Victor: attach body as json into res variable
app.use(express.json());

// Victor: cors allows/restricts requests from different domains
app.use(cors());

const limiter = expressRateLimiter({
    windowMS: MINUTE,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);

app.use("/api/v1/help", require());

app.use("*", (req, res) => {
    res.status(404).json({error: "not found"})
})

export default app;