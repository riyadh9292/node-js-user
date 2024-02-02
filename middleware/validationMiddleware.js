import validator from 'validator';

const isValidEmail = (email) => validator.isEmail(email);

const validateField = (value, validationFn, errorMessage) => {
  if (!validationFn(value)) {
    throw new Error(errorMessage);
  }
};

const validations = {
  age: (val) => !isNaN(val) && val >= 0,
  gender: (val) => ['MALE', 'FEMALE', 'OTHERS'].includes(val.toUpperCase()),
  profession: (val) => typeof val === 'string' && val.trim() !== '',
  phoneNumber: (val) => validator.isMobilePhone(val, 'any', { strictMode: false }),
};

const validateUserCreation = (req, res, next) => {
  const { name, email, age, gender, profession, phoneNumber } = req.body;

  const trimmedName = name ? name.trim() : '';

  try {
    validateField(trimmedName, (val) => val !== '', 'Name is required');
    validateField(email, isValidEmail, 'Invalid email address');

    // Validate optional fields
    Object.entries(validations).forEach(([field, validationFn]) => {
      validateField(req.body[field], validationFn, `Invalid ${field}`);
    });

    req.validatedUser = {
      name: trimmedName,
      email,
      age,
      gender,
      profession,
      phoneNumber,
    };

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export default validateUserCreation;