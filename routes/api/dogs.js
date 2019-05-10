// const express = require("express");
const router = require("express").Router();
// grabbing our models
const db = require("../../models");
const passport = require("../../config/passport");

module.exports = function(app) {
  // get route, edited to match sequelize
  app.get("/api/dogs", (req, res) => {
    // replace old function with sequelize function
    db.Dog.findAll({
      //attributes that will not reflect on the dog card on the search page
      attributes: {
        exclude: ["password"]
      },
      order: [["state"]]
    })
      // use promise method to pass the dogs...
      .then(function(dbDog) {
        res.json(dbDog);
      });
  });

  app.put("/api/dogs", (req, res) => {
    db.Dog.findOne({ where: { id: req.body.id } }).then(dog => {

      console.log(req.body.pet_name)
      // console.log(dog.pet_name)

      dog.pet_name = req.body.pet_name;
      dog.city = req.body.city;
      dog.description = req.body.description;

      dog.save();

      // dog.reload().then(() => {
      //   console.log(dog.pet_name)
      // })
    })
  });

  app.delete("/api/dogs/:id", (req, res) => {
    console.log(req.params);

    db.Dog.findOne({ where: { id: req.params.id } }).then(dog => {
      dog.destroy();
    })
  });

  // post route to create dogs
  app.post("/api/signup", function(req, res) {
    //or api/users
    db.Dog.create({
      id: req.body.id,
      username: req.body.username,
      password: req.body.password,
      pet_name: req.body.pet_name,
      breed: req.body.breed,
      city: req.body.city,
      state: req.body.state,
      description: req.body.description,
      email: req.body.email,
      imgurl: req.body.imgurl
    }).then(function(dbDog) {
      console.log(dbDog);
      res.json(dbDog);
    });
  });

  //route for reviews
  app.post("/api/review", function (req, res) {
    console.log(req.body);

    db.Review.create({
      reviewer: req.body.reviewer,
      dog_id: req.body.dog_id,
      review: req.body.review
    }).then(function(dbDog) {
      console.log(dbDog);
      res.json(dbDog);
    });
  });

  app.get("/api/review/:id", function(req, res) {
    db.Review.findAll({ where: { dog_id: req.params.id, }}).then(reviews => {
      res.json(reviews);
    });
  });

  // app.put("/api/update", function(req, res) {
  //   // Update takes in an object describing the properties we want to update, and
  //   // we use where to describe which objects we want to update
  //   db.Dog.update(
  //     {
  //       username: req.body.username,
  //       password: req.body.password,
  //       pet_name: req.body.pet_name,
  //       breed: req.body.breed,
  //       city: req.body.city,
  //       state: req.body.state,
  //       description: req.body.description,
  //       email: req.body.email,
  //       imgurl: req.body.imgurl
  //     },
  //     {
  //       where: {
  //         id: req.body.id
  //       }
  //     }
  //   ).then(function(dbDog) {
  //     res.json(dbDog);
  //   });
  // });

  //route for login
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // db.Dog.findOne({
    //   email: req.body.email,
    //   password: req.body.password
    // }).then(function(dbDog) {
      //res.json(dbDog);
    // });
    res.status(200).send(req.user);
    
    
  });

  app.get("/api/profile/:id", function(req, res) {
    db.Dog.findOne({
      attributes: {
        exclude: ["password"]
      },
      where: { id: req.params.id }
    }).then(function(dbDog) {
      res.json(dbDog);
    });
  });
};
