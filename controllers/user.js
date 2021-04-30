const User = require('../models').User;

module.exports = {
  list(req, res) {
    return User.findAll()
      .then((users) => res.status(200).send(users))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  add(req, res) {
    return User.create({
      username: req.body.username,
    })
      .then((student) => res.status(201).send(student))
      .catch((error) => res.status(400).send(error));
  },
};
