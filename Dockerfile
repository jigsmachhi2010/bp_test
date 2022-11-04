FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 9003
CMD ["npm", "start"]


