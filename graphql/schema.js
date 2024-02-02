import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLList,
	GraphQLString,
	GraphQLInt,
	GraphQLInputObjectType
} from 'graphql'
import { getUsersWithFieldsService } from '../services/userService.js'

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		age: { type: GraphQLInt },
		gender: { type: GraphQLString },
		profession: { type: GraphQLString },
		phoneNumber: { type: GraphQLString },
		createdAt: { type: GraphQLString }
	}
})

const UserQuery = new GraphQLObjectType({
	name: 'Query',
	fields: {
		users: {
			type: new GraphQLList(UserType),
			args: {
				fields: { type: new GraphQLList(GraphQLString) },
				limit: { type: GraphQLInt },
				orderBy: {
					type: new GraphQLList(
						new GraphQLInputObjectType({
							name: 'OrderByInput',
							fields: {
								field: { type: GraphQLString },
								direction: { type: GraphQLString }
							}
						})
					)
				}
			},
			resolve: (_, { fields, limit, orderBy }) =>
				getUsersWithFieldsService(fields, limit, orderBy)
		}
	}
})

const userSchema = new GraphQLSchema({
	query: UserQuery
})

export default userSchema
