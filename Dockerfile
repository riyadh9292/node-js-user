# Use the official Node.js image with a specific version
FROM node:16.13

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install prisma globally
RUN npm install -g prisma

# Generate Prisma Client
RUN prisma generate

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
