import { prisma } from '../db/prisma.js'

const createUserService = async (
	name,
	email,
	age,
	gender,
	profession,
	phoneNumber
) => {
	return prisma.user.create({
		data: {
			name,
			email,
			age,
			gender,
			profession,
			phoneNumber
		}
	})
}

const getUserByIdService = async (userId) => {
	return prisma.user.findUnique({
		where: { id: userId }
	})
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
	deleteAllUsersService
}
