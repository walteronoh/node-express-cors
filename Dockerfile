FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3200
CMD ["npm", "start"]
#CMD ["nodemon"]