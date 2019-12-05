const express = require("express");

const router = require("../router/router"); 

const server = express();

server.get("/", (req, res) => {
  res.send({ api: "Target Acquired"});
});

//............."/"...."route"
//........... CRUD>this route
server.use("/api/posts", router); 


module.exports = server; 
