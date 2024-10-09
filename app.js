require("dotenv").config;
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const eventsRouter = require("./routers/eventsRouter.js");
const errorFormatter = require("./middlewares/errorFormatter.js");
const routeNotFound = require("./middlewares/routeNotFound.js");

app.use(express.json());

//rotte
app.get("/", (req, res) =>
    res.send("<h1>Benvenuto nel mio gestore eventi</h1>")
);
app.use("/events", eventsRouter);

//middlewares per errori
app.use(errorFormatter);
app.use(routeNotFound);

app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});
