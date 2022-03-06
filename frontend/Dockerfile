FROM node:17-alpine3.14

RUN groupadd -r myuser && useradd -r -g myuser myuser
USER myuser

WORKDIR /app
COPY app/package.json ./
RUN npm install

COPY ./app .

EXPOSE 3000

CMD ["npm", "start"]