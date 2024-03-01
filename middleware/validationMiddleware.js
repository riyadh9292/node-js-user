import validator from 'validator'

const isValidEmail = (email) => validator.isEmail(email)

const validateField = (value, validationFn, errorMessage) => {
	if (!validationFn(value)) {
		throw new Error(errorMessage)
	}
}

const validations = {
	age: (val) => val === '' || (!isNaN(val) && val >= 0),
	gender: (val) =>
		val === '' || ['MALE', 'FEMALE', 'OTHERS'].includes(val.toUpperCase()),
	profession: (val) =>
		val === '' || (typeof val === 'string' && val.trim() !== ''),
	// phoneNumber: (val) =>
	// 	val === '' || validator.isMobilePhone(val, 'any', { strictMode: false }),
	video: (val) => val === '' || (typeof val === 'string' && val.trim() !== ''),
	about: (val) => val === '' || (typeof val === 'string' && val.trim() !== '')
}

const validateUserCreation = (req, res, next) => {
	const { name, email, username, password, confirmPassword } = req.body

	const trimmedName = name ? name.trim() : ''

	try {
		validateField(trimmedName, (val) => val !== '', 'Name is required')
		validateField(email, isValidEmail, 'Invalid email address')
		validateField(username, (val) => val !== '', 'Username is required')
		validateField(password, (val) => val !== '', 'Password is required')
		validateField(
			confirmPassword,
			(val) => val !== '' && val === password,
			'Passwords do not match'
		)

		// Validate optional fields
		Object.entries(validations).forEach(([field, validationFn]) => {
			console.log(req.body[field], `${req.body[field]} ${field}`)
			validateField(req.body[field], validationFn, `Invalid ${field}`)
		})

		req.validatedUser = {
			name: trimmedName,
			email,
			username,
			password,
			// Include optional fields if they exist
			age: req.body.age || null,
			gender: req.body.gender.toUpperCase() || null,
			profession: req.body.profession || null,
			profileImage: req.body.profileImage || null,
			video: req.body.video || null,
			about: req.body.about || null
		}

		next()
	} catch (error) {
		console.log(error)
		return res.status(400).json({ error: error.message })
	}
}

export default validateUserCreation
