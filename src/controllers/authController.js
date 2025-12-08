const asyncHandler = require('../utils/asyncHandler');
const authService = require('../services/authService');

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.login(email, password);

  res.status(200).json({
    success: true,
    data: result
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const result = await authService.changePassword(req.user.id, oldPassword, newPassword);

  res.status(200).json({
    success: true,
    message: result.message
  });
});

module.exports = {
  login,
  changePassword
};
