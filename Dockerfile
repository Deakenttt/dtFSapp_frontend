FROM node:20-alpine
# create a directory called: app, and put everything under it
WORKDIR /usr/src/app
# bring all the json file to    WORKDIR
COPY package*.json .

RUN npm install

COPY . .

# EXPOSE 5173

CMD [ "npm","run","dev" ]