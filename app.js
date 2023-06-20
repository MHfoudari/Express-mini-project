const express = require("express");
const connectDb = require("./database");
const errorHandle = require("./Middlewares/errorHandle");
const notFound = require("./Middlewares/notFound");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const moviesRoutes = require("./api/Movies.routes");
const path = require("path");
const app = express();

app.use("/media/", express.static(path.join(__dirname, "media")));
dotenv.config();
connectDb();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/movies", moviesRoutes);
app.use(notFound);
app.use(errorHandle);

app.listen(process.env.PORT, () => {
  console.log("The application is running on localhost:8000");
});
