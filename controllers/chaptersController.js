const db = require('../models');

// Defining methods for the chaptersController
module.exports = {
  findAll: (req, res) => db.Chapter
    .find({ user: req.user._id })
    .sort({ date: -1 })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err)),
  findById: (req, res) => db.Chapter
    .findById(req.params.id)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err)),
  create: (req, res) => db.Chapter
    .create(Object.assign({}, req.body, { user: req.user._id }))
    .then(dbModel =>
      db.User.update({ _id: req.user._id }, { $push: { chapterRef: dbModel._id } })
        .then(() => res.json(dbModel))
        .catch(err => res.status(422).json(err))),
  update: (req, res) => db.Chapter
    .findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err)),
  remove: (req, res) => db.Chapter
    .findById({ _id: req.params.id })
    .then(dbModel => dbModel.remove())
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
};
