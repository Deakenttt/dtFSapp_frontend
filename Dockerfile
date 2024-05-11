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
FROM node:18-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Vite project, this may take a while (time consuming)
RUN npm run build

# Use Nginx as the base image for serving the Vite app
FROM nginx:alpine

# Copy the built Vite app from the previous stage to the nginx public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Command to start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]