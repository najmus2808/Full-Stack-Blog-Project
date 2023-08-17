const mongoose = require("mongoose");

const app = require("./app");
const config = require("./config");

let server;

// handle uncaught exception
process.on("uncaughtException", () => {
  // console.log('uncaughtException is detected....')
  console.log("uncaughtException is detected....");
  process.exit(1);
});

// handle unhandledRejection
process.on("unhandledRejection", (error) => {
  if (server) {
    server.close(() => {
      console.log(error);
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// handle SIGTERM
process.on("SIGTERM", () => {
  console.log("SIGTERM is received");
  if (server) {
    server.close();
  }
});

const dbConnect = async () => {
  try {
    await mongoose.connect(config.database_url);
    console.log("Database is connected successfully");
    server = app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    console.log("Failed to connect database", error);
  }
};

dbConnect();
