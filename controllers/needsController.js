"use strict";

const mongoose = require("mongoose");
const passport = require("passport");
// const User = require("../models/user");
// const Need = requie("./models/needs")
const db = require("../models");

let isAuthenticated = (req, res, next) => {
  // do any checks you want to in here

  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  if (req.user.authenticated)
      return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.json({user: null});
}


module.exports = {
  findAll: (req, res) => {
    // db.Needs.find({user: req.user})
    db.Needs.find({})
      .then(needs => res.json(needs))
      .catch(err => res.json(err))
    // console.log("hey");
    // res.json("hey")
  },
  create: (req, res) => db.Needs.create(req.body).then(result => res.json(result)).catch(err => res.json(err)),
  findById: (req, res) => res.json("findById"),
  update: (req, res) => res.json("update"),
  remove: (req, res) => res.json("remove")

}


// class NeedsController {

//   findAll(req, res) {
//     console.log("received findAll request")
//     if (!req.isAuthenticated  || !req.isAuthenticated()) {

//       return req.status(401).json({
//         success: false,
//         message: "You need to be authentiocated to access this resource."
//       })
//     }
//     else {
//       return db.Needs
//         .find(req.query)
//         .sort({ date: -1 })
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));

//     }
//   }
//   // findById: function(req, res) {
//   //   db.Book
//   //     .findById(req.params.id)
//   //     .then(dbModel => res.json(dbModel))
//   //     .catch(err => res.status(422).json(err));
//   // },
//   // create: function(req, res) {
//   //   db.Book
//   //     .create(req.body)
//   //     .then(dbModel => res.json(dbModel))
//   //     .catch(err => res.status(422).json(err));
//   // },
//   // update: function(req, res) {
//   //   db.Book
//   //     .findOneAndUpdate({ _id: req.params.id }, req.body)
//   //     .then(dbModel => res.json(dbModel))
//   //     .catch(err => res.status(422).json(err));
//   // },
//   // remove: function(req, res) {
//   //   db.Book
//   //     .findById({ _id: req.params.id })
//   //     .then(dbModel => dbModel.remove())
//   //     .then(dbModel => res.json(dbModel))
//   //     .catch(err => res.status(422).json(err));
//   // }
//   // find(userId)

// }


// // export default NeedsController
// module.exports = NeedsController