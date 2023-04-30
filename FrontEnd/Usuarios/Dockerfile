FROM node:19.6.1-alpine

WORKDIR /app/FrontEnd/Usuarios

COPY package*.json ./
COPY . .

RUN npm install

# Arranca la aplicación
CMD ["npm", "start"]