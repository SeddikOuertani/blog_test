
const bcrypt = require('bcryptjs');
const Role = require('../models/role');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// ACCESS / REFRESH HELPERS
const createAccessToken = (userId) => {
    console.log("process.env.JWT_SECRET : ", process.env.JWT_SECRET)
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

const createRefreshToken = (userId) => {
    console.log("process.env.JWT_REFRESH_SECRET : ", process.env.JWT_REFRESH_SECRET)
    return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
}


module.exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const roleDoc = await Role.findOne({ name: role || 'reader' });

    const user = await User.create({
      username,
      email,
      password: hashed,
      role: roleDoc._id
    });

    return res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).populate('role');
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  const accessToken = createAccessToken(user._id);
  const refreshToken = createRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  return res.json({
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      username: user.username,
      role: {
        name: user.role.name, permissions: user.role.permissions
    }
    }
  });
}

module.exports.logout = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(400).json({ message: 'No token' });

  const user = await User.findOne({ refreshToken });
  if (user) {
    user.refreshToken = null;
    await user.save();
  }

  return res.json({ message: 'Logged out' });
}