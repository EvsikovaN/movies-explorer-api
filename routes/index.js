const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { userRoutes } = require('./userRoutes');
const { movieRoutes } = require('./movieRoutes');
const { NotFoundError } = require('../errors/not-found-err');
const { validateSignUp, validateAuth } = require('../utils/validation');
const { createUser, login } = require('../controllers/userControllers');

router.post(
  '/signin',
  validateAuth,
  login,
);

router.post(
  '/signup',
  validateSignUp,
  createUser,
);
router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемой страницы не существует'));
});

module.exports = router;
