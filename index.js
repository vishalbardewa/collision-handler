const seedData = require('./seed_data.json');
const moment = require('moment');
const fs = require('fs');

let count = 0;

let data = [];
let obj = {
  start_date: '01/02/2021',
  end_date: '15/02/2021',
  start_time: '09:00',
  end_time: '10:00',
  weekdays: 'Monday',
  userId: "1",
  createdAt: '2021-04-29 23:54:29.754+05:30',
  updatedAt: '2021-04-29 23:54:29.754+05:30',
};

// obj.start_date = moment(obj.start_date).add(7, 'days').format('L');
while (count < 1000) {
  // 0
  let newObj = { ...obj }; // obj
  let startdate = moment(newObj.start_date, 'DD MM YYYY'); // 01/02
  let enddate = moment(newObj.end_date, 'DD MM YYYY'); // 15/02

  newObj.start_date = startdate.add(15, 'days').format('DD/MM/YYYY');
  newObj.end_date = enddate.add(14, 'days').format('DD/MM/YYYY');

  data.push(newObj);
  obj = { ...newObj };
  count++;
}
const updatedObj = {
  data
}

const jsonifiedData = JSON.stringify(updatedObj, null, 2);
fs.writeFile('./seed_data.json', jsonifiedData,'utf-8' , (err) => {
  if (err) throw err;
  console.log('Data written to file');
});
