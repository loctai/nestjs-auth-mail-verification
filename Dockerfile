FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --legacy-peer-deps

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]