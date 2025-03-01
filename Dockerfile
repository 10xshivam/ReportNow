# Base Image
FROM node:20.17.0-alpine3.19

WORKDIR /home/app/

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]