import { prisma } from "../db/prisma.js";

const createUserService = async (name, email, age, gender, profession, phoneNumber) => {
	return prisma.user.create({
	  data: {
		name,
		email,
		age,
		gender,
		profession,
		phoneNumber,
	  },
	});
  };
  
  const getUserByIdService = async (userId) => {
	return prisma.user.findUnique({
	  where: { id: userId },
	});
  };
  
  const getUsersWithFieldsService = async (fields) => {
	return prisma.user.findMany({
	  select: fields,
	});
  };
  
  export { createUserService, getUserByIdService, getUsersWithFieldsService };