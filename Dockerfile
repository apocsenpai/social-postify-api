FROM node:16 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

COPY . .

# Install app dependencies
RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]