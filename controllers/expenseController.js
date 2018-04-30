const db = require('../models');


module.exports = {
  findAll: (req, res) => db.Expense
    .find({ user: req.user._id })
    // .find(req.query)
    // .find({})
    .sort({ date: -1 })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err)),
  findById: (req, res) => db.Expense
    .findById(req.params.id)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err)),
  create: (req, res) => db.Expense
    .create(Object.assign({}, req.body, { user: req.user }))
    .then(dbModel => db.User
      .update({ _id: req.user._id }, { $push: { expRef: dbModel._id } })
      .then(() => res.json(dbModel))
      .catch(err => res.json(err)))
    .catch(err => res.json({ error: true, err })),
  update: (req, res) => db.Expense
    .findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err)),
  remove: (req, res) => db.Expense
    .findById({ _id: req.params.id })
    .then(dbModel => dbModel.remove())
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
};
