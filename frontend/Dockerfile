FROM node:17-alpine3.14

WORKDIR /app_docker

COPY app/package.json ./
RUN npm install

COPY .dockerignore .
COPY ./app .

EXPOSE 3000

CMD ["npm", "start"]