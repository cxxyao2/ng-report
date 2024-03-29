// get environment variables
const fs = require("fs");

const express = require("express");
const app = express();
app.use(express.static(__dirname + "/docs")); // serve our static files

// direct all of the requests to index.html
app.all("/*", (req, res) => {
  res.status(200).sendFile(__dirname + "/docs/index.html");
});
app.listen(process.env.PORT || 8080);

// ./src/environment/environment.ts
