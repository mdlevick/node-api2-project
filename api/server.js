const express = require("express");

const seedsRouter = require("../seeds/seeds-router.js"); 

const server = express();

server.get("/", (req, res) => {
  res.send(`
    <h2>Seeds API</h>
    <p>Welcome to the Seeds API</p>
  `);
});

server.use("/api/seeds", seedsRouter); 


module.exports = server; 
