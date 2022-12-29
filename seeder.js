const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('./models/User');
const Task = require('./models/Task');
dotenv.config({ path: './config/config.env' });

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

// const courses = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
// );
const importData = async () => {
  try {
    await User.create(users);

    console.log('Data imported successfully');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deletetData = async () => {
  try {
    await User.deleteMany({});

    console.log('Data deleted successfully');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deletetData();
}
