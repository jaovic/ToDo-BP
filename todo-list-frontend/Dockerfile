FROM node:18.5.0

RUN npm install -g http-server

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm install --quiet --no-optional --no-fund --loglevel=error

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "http-server", "dist"]
