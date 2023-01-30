const mongoose = require('mongoose');
const dotenv = require('dotenv');
DATABASE="mongodb+srv://youssef:roexy2sQ6B3mafA1@cluster0.jviua.mongodb.net/home-made?retryWrites=true&w=majority"
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = DATABASE

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log('DB Connection Failed!', err));
  
// mongoose
//   .connect(process.env.DATABASE_LOCAL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => 
//     console.log('DB connection successful!'));
//     console.log(process.env.NODE_ENV);
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
