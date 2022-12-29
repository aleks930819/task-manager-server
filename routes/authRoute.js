const express = require('express');
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/me', protect, getMe);
authRouter.put('/updateddetails', protect, updateDetails);
authRouter.put('/updatepassword', protect, updatePassword);


authRouter.post('/forgot-password', forgotPassword);
authRouter.put('/reset-password/:resettoken', resetPassword);



module.exports = authRouter;
