const validator = require('validator');

const passwordRules = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

const passwordRequirementMessage =
  `Password must be at least ${passwordRules.minLength} characters and include ` +
  `at least ${passwordRules.minUppercase} uppercase letter, ` +
  `${passwordRules.minLowercase} lowercase letter, ` +
  `${passwordRules.minNumbers} number, and ` +
  `${passwordRules.minSymbols} symbol.`;

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error('First and last name are required');
  } else if (firstName.length < 2 || firstName.length > 50) {
    throw new Error('First name must be between 2 and 50 characters');
  } else if (!validator.isEmail(emailId)) {
    throw new Error('Email is not valid');
  } else if (!validator.isStrongPassword(password, passwordRules)) {
    throw new Error(passwordRequirementMessage);
  }
};

const validateEditUserData = (req) => {
  const allowedUpdates = [
    'firstName',
    'lastName',
    'age',
    'gender',
    'skills',
    'profilePicture',
    'bio',
  ];

  return Object.keys(req.body).every((field) => allowedUpdates.includes(field));
};

module.exports = { validateSignUpData, validateEditUserData };