import { prisma } from '../db/prisma.js'

const createUserService = async (
	name,
	email,
	username,
	age,
	gender,
	profession,
	hashedPassword,
	profileImage,
	video,
	about
) => {
	return prisma.user.create({
		data: {
			name,
			email,
			username,
			age,
			gender,
			profession,
			password: hashedPassword,
			profileImage,
			video,
			about
		}
	})
}

const getUserByEmail = async (email) => {
	try {
		// Find user by email using Prisma
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		})

		// Return the user object if found, otherwise return null
		return user
	} catch (error) {
		// If any error occurs, throw an error
		throw new Error('Error fetching user data')
	}
}

const getAllUsers = async () => {
	try {
		const users = await prisma.user.findMany()
		return users
	} catch (error) {
		throw new Error('Error fetching users')
	}
}

const getUserDetailsById = async (userId) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: +userId }
		})
		return user
	} catch (error) {
		throw new Error(error.message)
	}
}

const getUserByIdService = async (userId) => {
	return prisma.user.findUnique({
		where: { id: userId }
	})
}

const incrementProfileViews = async (userId) => {
	try {
		// Fetch the user
		const user = await prisma.user.findUnique({
			where: { id: +userId }
		})

		if (!user) {
			throw new Error('User not found')
		}

		// Increment profileViews count
		await prisma.user.update({
			where: { id: +userId },
			data: { profileViews: user.profileViews + 1 }
		})
	} catch (error) {
		throw new Error(error.message)
	}
}

const getUsersWithFieldsService = async (
	fields,
	limit = 10,
	orderBy = [{ field: 'createdAt', direction: 'asc' }]
) => {
	// Ensure that at least one field is selected
	const selectFields = fields.length > 0 ? fields : ['id']

	return prisma.user.findMany({
		take: limit, // Limit the number of fetched users
		orderBy: orderBy.map((criterion) => ({
			[criterion.field]: criterion.direction
		})),
		select: {
			// Include the selected fields in the 'select' statement
			// 'id' is included by default to prevent an error
			...selectFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
		}
	})
}

const deleteAllUsersService = async (req, res) => {
	try {
		return prisma.user.deleteMany() // Delete all records
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export {
	createUserService,
	getUserByIdService,
	getUsersWithFieldsService,
	deleteAllUsersService,
	getUserByEmail,
	getAllUsers,
	getUserDetailsById,
	incrementProfileViews
}
