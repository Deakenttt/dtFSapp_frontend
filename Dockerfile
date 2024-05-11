# choose the proper node inmage.... https://hub.docker.com
# check node version with comment: node -V
FROM node:18-alpine as BUILD_IMAGE

WORKDIR /app/react-app

# copy package.json .
COPY package.jason .

# include all our package 

RUN npm install

# copy all our remaining files
COPY . .

# build our project
RUN npm run build

FROM node:18-alpine as PRODUCTION_IMAGE
# can give any directory path
WORKDIR /app/react-app

# here, we are copying /app/react-app/dist folder from BUILD_IMAGE to
# /app/react-app/dist in this stage.

# why dist folder ???
# when we run npm run build, vite will generate dist directory that contains
# our build files.
COPY --from=BUILD_IMAGE /app/react-app/dist/ /app/react-app/dist/

CMD ["npm", "run", "dev"]