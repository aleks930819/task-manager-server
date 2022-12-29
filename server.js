const express = require('express');
const path = require('path');

const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const taskRouter = require('./routes/taskRoute');
const authRouter = require('./routes/authRoute');
const errorHandler = require('./middleware/errorHandler');
const userRouter = require('./routes/usersRoute');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

const mongoSanitize = require('express-mongo-sanitize');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(fileupload());

app.use(mongoSanitize());

app.use(helmet());

app.use(xss());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min.
  max: 100,
});
app.use(limiter);

app.use(hpp());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port:${PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Unhandled rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
