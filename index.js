import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import multer from 'multer';
import bodyParser from 'body-parser';
import { createHandler } from 'graphql-http/lib/use/express';
import {
  createUser,
  deleteAllUsers,
  getUserDetails,
  getUserProfile,
  getUsers,
  loginUser,
} from './controllers/userController.js';
import validateUserCreation from './middleware/validationMiddleware.js';
import notFoundMiddleware from './middleware/notFoundMiddleware.js';
import userSchema from './graphql/schema.js';
import { uploadFile } from './controllers/uploadFile.js';
// import { checkCache } from './middleware/checkCache.js'
import { authenticateJWT } from './middleware/authMiddleware.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
const upload = multer();

app.post('/api/upload', upload.single('file'), uploadFile);
app.post('/api/create-user', validateUserCreation, createUser);
app.post('/api/sign-in', loginUser);
// app.get('/api/users', checkCache, getAllUsers)
app.get('/api/users', getUsers);
app.get('/api/user/profile', authenticateJWT, getUserProfile);
app.get('/api/user/:userId', authenticateJWT, getUserDetails);
app.delete('/api/delete-all-users', deleteAllUsers);

// GraphQL endpoint
app.all(
  '/graphql',
  createHandler({
    schema: userSchema,
  })
);

// Use the notFoundMiddleware for all other routes
app.use(notFoundMiddleware);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on ${PORT}`);
});
