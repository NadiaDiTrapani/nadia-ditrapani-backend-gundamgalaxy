const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors')

const PORT = process.env.PORT || 8080;
const CORS_ORIGIN = process.env.CORS_ORIGIN ||3000

app.use(express.json())
app.use((cors({origin: CORS_ORIGIN})));
app.use(express.static("public"))

const gundamRouter = require("./routes/gundam-routes");
const userRouter = require('./routes/user-route')
const wishlistRouter = require('./routes/wishlist-route')

app.use('/gundams', gundamRouter);
app.use('/users', userRouter);
app.use('/wishlist', wishlistRouter)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))