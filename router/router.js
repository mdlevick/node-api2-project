const express = require("express");

const router = express.Router();

const db = require("../data/db")

router.get("/", (req, res) => {

    db.find(req.query)
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

router.get("/:id", (req, res) => {
    db.findById(req.params.id)
      .then(post => {
        if (post) {
            console.log(post)
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

  router.post("/", (req, res) => {
    db.add(req.body)
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
      const id = req.params.id;
    db.remove(id)
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
    const id = req.params.id;
    db.update(id, changes)
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

 router.get("/:id/comments", (req, res) => {
      const id = req.params.id
    db.findPostComments(id)
          .then(comments => {
        res.status(200).json(comments);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "error getting post comments" });
      });
  });
  


 router.get("/:id/comment", (req, res) => {
    const id = req.params.id
  db.findCommentById(id)
      .then(comments => {
      res.status(200).json(comments);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "error getting post comments" });
    });
});
  
  router.post("/:id/comments", (req, res) => {
    db.insertComment(req.body)
      .then(comment => {
        res.status(201).json(comment);
      })
     .catch(err => {
  
        console.log(err);
        res.status(500).json({
          message: "Error adding the comment"
        });
      });
  });
  module.exports = router; 