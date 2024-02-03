import {
	createUserService,
	getUserByIdService,
	getUsersWithFieldsService,
	deleteAllUsersService
} from '../services/userService.js'

const createUser = async (req, res) => {
	const { name, email, age, gender, profession, phoneNumber } =
		req.validatedUser

	try {
		const newUser = await createUserService(
			name,
			email,
			age,
			gender,
			profession,
			phoneNumber
		)
		res.status(201).json(newUser)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

const getUser = async (req, res) => {
	const userId = parseInt(req.params.id, 10)

	try {
		const user = await getUserByIdService(userId)

		if (!user) {
			return res.status(404).json({ error: 'User Not Found' })
		}

		res.status(200).json(user)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const getUsersWithFields = async (req, res) => {
	const fields = req.body.fields

	try {
		const users = await getUsersWithFieldsService(fields)

		if (!users || users.length === 0) {
			return res.status(404).json({ error: 'No users found' })
		}

		res.status(200).json(users)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const deleteAllUsers = async (req, res) => {
	try {
		await deleteAllUsersService()
		res.status(200).json({ message: 'All users deleted successfully.' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export { createUser, getUser, getUsersWithFields, deleteAllUsers }
