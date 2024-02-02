FROM node:16.13

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g prisma

COPY . .

EXPOSE 3000

ENV NODE_ENV production

RUN prisma generate

# Command to run your application
CMD ["node", "src/index.js"]
