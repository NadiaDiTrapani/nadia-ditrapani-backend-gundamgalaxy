const express = require('express');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 8080;

const gundamRouter = require("./routes/gundam-routes");
const userRouter = require('./routes/user-route')

app.use(express.static("public"))

app.use(express.json())

app.use('/gundams', gundamRouter);
app.use('/users', userRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))