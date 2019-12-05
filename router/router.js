const express = require("express");

const router = express.Router();

const Db = require("../data/db")

router.get("/", (req, res) => {

    console.log(req.query);
    Db.find(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
               message: "error retrieving the posts" 
            });
        });
});














module.exports = router; 