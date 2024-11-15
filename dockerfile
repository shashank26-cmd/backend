FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install 

# RUN npm i bcrypt


COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
