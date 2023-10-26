const express = require("express");
const http = require('http');
const path = require('path');
const cors = require('cors')
const logger = require('morgan');
const userRouter = require('./controller/user.controller');
const printRouter = require("./controller/print.controller");
const socketSetup = require('./EventBus/eventBus');
const app = express();
const server = http.createServer(app);
const io = socketSetup(server);

const PORT = process.env.PORT || 5000;
app.use(logger('dev'));
app.use(cors())
app.use("/static", express.static(path.join(__dirname, 'public')));
app.use("/user", userRouter);
app.use("/print", printRouter);

server.listen(PORT, () => {
    console.log(`the server is listening on Port ${PORT}`)
})

module.exports = {io}