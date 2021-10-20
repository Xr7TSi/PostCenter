# Dockerfile from React Frontend

FROM node:15

WORKDIR /usr/src/app

COPY package*.json ./

#  Install dependencies
RUN npm install

# Copy app source code
COPY . .

EXPOSE 3000

CMD ["npm","start"]