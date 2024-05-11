# # choose the proper node inmage.... https://hub.docker.com
# # check node version with comment: node -V
# FROM node:18-alpine as BUILD_IMAGE

# WORKDIR /app/react-app

# # copy package.json .
# COPY package.json .

# # include all our package 

# RUN npm install

# # copy all our remaining files
# COPY . .

# # build our project
# RUN npm run build

# FROM node:18-alpine as PRODUCTION_IMAGE
# # can give any directory path
# WORKDIR /app/react-app

# # here, we are copying /app/react-app/dist folder from BUILD_IMAGE to
# # /app/react-app/dist in this stage.

# # why dist folder ???
# # when we run npm run build, vite will generate dist directory that contains
# # our build files.
# COPY --from=BUILD_IMAGE /app/react-app/dist/ /app/react-app/dist/

# CMD ["npm", "run", "dev"]

# Use an official Node.js runtime as the base image
FROM node:19.4-bullseye AS build

# Specify working directory other than /
WORKDIR /usr/src/app

# Copy only files required to install
# dependencies (better layer caching)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Vite project, this may take a while (time consuming)
RUN npm run build

CMD ["npm", "run", "dev"]

# # Use separate stage for deployable image
# FROM nginxinc/nginx-unprivileged:1.23-alpine-perl

# # # Use COPY --link to avoid breaking cache if we change the second stage base image
# # COPY --link nginx.conf /etc/nginx/conf.d/default.conf

# COPY --link --from=build usr/src/app/dist/ /usr/share/nginx/html

EXPOSE 8080