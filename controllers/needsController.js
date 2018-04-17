"use strict";

const mongoose = require("mongoose");
const passport = require("passport");
// const User = require("../models/user");
// const Need = requie("./models/needs")
const db = require("../models");


module.exports = {
  findAll: (req, res) => {
    db.Needs.find({user: req.user})
    // db.Needs.find({})
      .then(needs => res.json(needs))
      .catch(err => res.json(err))
    // console.log("hey");
    // res.json("hey")
  },

  create: (req, res) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.status(202).json({error: true, message: "Bad Authentication"})
    }
    const data = req.body;
    data.user = req.user;
    return db.Needs.create(data).then(result => res.json(result)).catch(err => res.json(err))},

  findById: (req, res) => db.Needs.findById(req.params.id).then(result => res.json(result)).catch(err => res.json(err)),
  // findById: (req, res) => res.json("findById"),

  update: (req, res) => {
    // I don't think this syntax is right.
    return db.Needs.update({_id: req.params.id}, req.body)
      .then(result => res.json(result))
      .catch(err => res.json(err))
  },

  remove: (req, res) => res.json("remove not implemented")
};