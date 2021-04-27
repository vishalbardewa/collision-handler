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

  // select * from "Slots" where weekdays in('Wednesday')
  // and start_time<='11:30:00'
  // and start_date<='2021-02-14' and end_date>='2021-02-14'
  async add(req, res) {
    const isSlotFilled = await Slot.findAll({
      where: {
        [Op.and]: {
          weekdays: {
            [Op.in]: [req.body.weekdays],
          },
          [Op.or]: {
            [Op.and]: [
              {
                start_date: {
                  [Op.lte]: req.body.start_date,
                },
              },
              {
                end_date: {
                  [Op.gte]: req.body.start_date,
                },
              },
              {
                start_time: {
                  [Op.lte]: req.body.start_time,
                },
              },
              {
                end_time: {
                  [Op.gte]: req.body.start_time,
                },
              },
            ],
            [Op.and]: [
              {
                start_date: {
                  [Op.lte]: req.body.end_date,
                },
              },
              {
                end_date: {
                  [Op.gte]: req.body.end_date,
                },
              },
              {
                start_time: {
                  [Op.lte]: req.body.end_time,
                },
              },
              {
                end_time: {
                  [Op.lte]: req.body.end_time,
                },
              },
            ],
          },
        },
      },
    });

    // const isPreSlottedFilled = await Slot.findAll({
    //   where: {
    //     [Op.and]: [
    //       {
    //         start_date: {
    //           [Op.lte]: req.body.start_date,
    //         },
    //       },
    //       {
    //         end_date: {
    //           [Op.gte]: req.body.start_date,
    //         },
    //       },
    //       {
    //         start_time: {
    //           [Op.lte]: req.body.start_time,
    //         },
    //       },
    //       {
    //         end_time: {
    //           [Op.lte]: req.body.start_time,
    //         },
    //       },
    //     ],
    //   },
    // });

    // console.log(isSlotFilled);
    // console.log(isPreSlottedFilled);
    // console.log(isSlotFilled[0]._dataValues.start_time >= req.body.start_time && isSlotFilled[0]._previousDataValues.end_time <= req.body.end_time);
    if (!isSlotFilled.length) {
      return Slot.create({
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        weekdays: req.body.weekdays,
      })
        .then((slot) => res.status(201).send(slot))
        .catch((error) => res.status(400).send(error));
    }
    return res.status(409).send('Resource Already Exists');
    // if(!isSlotFilled)
    // isSlotFilled.then(() => {

    // }).catch(() => res.status(409).send("Resource Already Exists"))
  },
};
