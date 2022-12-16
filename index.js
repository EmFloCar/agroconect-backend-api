require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const router = express.Router();

const postRoutes = require("./routes/post.routes")
const authRoutes = require("./routes/auth.routes")

const database = require("./bin/database");



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors())

app.use("/post", postRoutes)
app.use("/auth", authRoutes)

app.listen(process.env.PORT || 3000, () => {
    console.log("server on");
  })