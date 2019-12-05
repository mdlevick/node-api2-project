const express = require("express");

const router = express.Router();

const Db = require("../data/db")

router.get("/api/posts/", (req, res) => {

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

router.get("/api/posts/:id", (req, res) => {
    Db.findById(req.params.id)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: "post not found" });
        }
      })
      .catch(err=> {
        console.log(err);
        res.status(500).json({
          message: "Error retrieving the post"
        });
      });
  });

  router.post("/api/posts/", (req, res) => {
    Db.add(req.body)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
       
        console.log(err);
        res.status(500).json({
          message: "Error adding the post"
        });
      });
  });

  router.delete("/:id", (req, res) => {
    Db.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "The post has been nuked" });
        } else {
          res.status(404).json({ message: "The post could not be found" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: "Error removing the post"
        });
      });
  });
  
  router.put("/:id", (req, res) => {
    const changes = req.body;
    Db.update(req.params.id, changes)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: "The post could not be found" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: "Error updating the post"
        });
      });
  });








module.exports = router; 