const User = require('../../models/user');
const { body } = require('express-validator');

exports.rules = (() => {
  return [
    body('name').notEmpty().trim(),
    body('email')
      .notEmpty()
      .isEmail()
      .custom(async (email) => {
        return await User.findOne({ email }).then((user) => {
          if (user) {
            return Promise.reject('E-mail already in used!');
          }
        });
      }),
    body('password').isLength({ min: 5, max: 30 }),
    body('contact_no')
      .notEmpty()
      .custom(async (contact_no) => {
        return await User.findOne({ contact_no }).then((user) => {
          if (user) {
            return Promise.reject('E-mail already in used!');
          }
        });
      }),
    ,
    body('company').notEmpty(),
    body('location').notEmpty(),
  ];
})();
