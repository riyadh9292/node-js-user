import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import redis from 'redis'
import {
	createUserService,
	getUserByIdService,
	getUsersWithFieldsService,
	deleteAllUsersService,
	getUserByEmail,
	getAllUsers,
	getUserDetailsById
} from '../services/userService.js'
dotenv.config()

const client = redis.createClient()

const createUser = async (req, res) => {
	console.log('controller calling')
	const {
		name,
		email,
		username,
		age,
		gender,
		profession,
		password,
		profileImage,
		video,
		about
	} = req.validatedUser
	try {
		const hashedPassword = await bcrypt.hash(password, 10)
		const newUser = await createUserService(
			name,
			email,
			username,
			+age,
			gender,
			profession,
			hashedPassword,
			profileImage,
			video,
			about
		)
		res.status(201).json(newUser)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

const loginUser = async (req, res) => {
	const { email, password } = req.body

	try {
		const user = await getUserByEmail(email)

		if (!user) {
			return res.status(401).json({ error: 'Invalid email or password' })
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)

		if (!isPasswordValid) {
			return res.status(401).json({ error: 'Invalid email or password' })
		}

		const token = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: '6h' }
		)

		// Respond with the generated token
		return res.status(200).json({ token })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: 'Internal server error' })
	}
}

const getUsers = async (req, res) => {
	try {
		const users = await getAllUsers()
		// Set data in cache
		// client.setEx(key, 3600, JSON.stringify(users))
		res.status(200).json(users)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const getUserDetails = async (req, res) => {
	try {
		const userId = req.params.userId
		const user = await getUserDetailsById(userId)
		if (!user) {
			return res.status(404).json({ error: 'User not found' })
		}
		res.status(200).json(user)
	} catch (error) {
		res.status(500).json({ error: error.message })
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

export {
	createUser,
	getUser,
	getUsersWithFields,
	deleteAllUsers,
	loginUser,
	getUsers,
	getUserDetails
}
