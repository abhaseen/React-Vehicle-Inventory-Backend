if (process.env.NODE_EVN !== "production") {
  require("dotenv").config();
}

const express = require("express"); //server communication
const mongoose = require("mongoose"); //mongoose database driver
const cors = require("cors");
const helmet = require("helmet");

const vehicleRouter = require("./routes/vehicles");

const app = express();
const PORT = 5000;

const URI = process.env.MONGODB_URI || process.env.DB_DEV;

//setting up the mongoose
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    dbName: "db-a1"
  })
  .then(() => {
    return console.log("MongoDB connected successfully.");
  })
  .catch(err => {
    return console.log("MongoDB failed to connect: " + err);
  });

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/api", vehicleRouter);

// Listen on port
app.listen(PORT, () => {
  console.log("App listening on port: " + PORT);
});
