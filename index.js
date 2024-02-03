import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import { createHandler } from 'graphql-http/lib/use/express'
import {
	createUser,
	deleteAllUsers,
	getUser
} from './controllers/userController.js'
import validateUserCreation from './middleware/validationMiddleware.js'
import notFoundMiddleware from './middleware/notFoundMiddleware.js'
import userSchema from './graphql/schema.js'

dotenv.config()
const app = express()
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000

app.post('/create-user', validateUserCreation, createUser)
app.get('/user/:id', getUser)
app.delete('/delete-all-users', deleteAllUsers)

// GraphQL endpoint
app.all(
	'/graphql',
	createHandler({
		schema: userSchema
	})
)

// Use the notFoundMiddleware for all other routes
app.use(notFoundMiddleware)

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`)
})
