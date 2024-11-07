# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

# Step1: determine the environment where the container will run
FROM node:16.14.0 as builder

ARG SECRET_KEY \
    DATABASE_SERVER_URL \
    PORT

ENV SECRET_KEY=$SECRET_KEY \
    DATABASE_SERVER_URL=$DATABASE_SERVER_URL \
    PORT=$PORT

# this line is like when you are cd to a specific directory
# Step2: cd to the working directory
WORKDIR /usr/app

# Step3: copy needed dependencies to docker image
COPY package*.json ./

# Step4: install required dependencies
RUN npm ci

# Copy the rest of the source files into the image.
# Step5: copy the source code to docker image
COPY . .

# Expose the port that the application listens on.
EXPOSE 3001

# Run the application.  
RUN npm run build
CMD node dist/index.js