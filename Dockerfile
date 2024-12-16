# Use the official Node.js image as a base
FROM node:20.0.18-slim

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port on which the Node.js server will run
EXPOSE 3000

# Command to run the application
CMD [ "npm", "start" ]
