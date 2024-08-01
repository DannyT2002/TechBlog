const router = require('express').Router();
const { User } = require('../../models');
const { hashPassword, comparePassword } = require('../../utils/bcrypt');

router.post('/signup', async (req, res) => {
  try {
    console.log('Signup request received:', req.body);
    const hashedPassword = await hashPassword(req.body.password);
    const newUser = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });

    console.log('New user created:', newUser);

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res.status(400).json({ message: 'No user found with that username!' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.status(200).json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json(err);
  }
});



router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
