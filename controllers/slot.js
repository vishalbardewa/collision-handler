const Op = require('sequelize').Op;
const Slot = require('../models').Slot;

module.exports = {
  list(req, res) {
    return Slot.findAll()
      .then((slots) => res.status(200).send(slots))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  async add(req, res) {
    const isSlotFilled = await Slot.findAll({
      where: {
        [Op.and]: [
          {
            userId: {
              [Op.eq]: req.body.userId,
            },
          },
          {
            [Op.and]: [
              {
                start_date: {
                  [Op.lte]: req.body.end_date,
                },
              },
              {
                end_date: {
                  [Op.gte]: req.body.start_date,
                },
              },
            ],
          },
          {
            weekdays: {
              [Op.eq]: req.body.weekdays,
            },
          },
          {
            [Op.and]: [
              {
                start_time: {
                  [Op.lte]: req.body.end_time,
                },
              },
              {
                end_time: {
                  [Op.gte]: req.body.start_time,
                },
              },
            ],
          },
        ],
      },
    });

    console.log(isSlotFilled);
    if (!isSlotFilled.length) {
      return Slot.create({
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        weekdays: req.body.weekdays,
        userId: req.body.userId,
      })
        .then((slot) => res.status(201).send(slot))
        .catch((error) => res.status(400).send(error));
    }
    return res.status(409).send('Resource Already Exists');
  },
};
