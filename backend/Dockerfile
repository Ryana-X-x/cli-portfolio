FROM node:16

# Install bash if not already present
RUN apt-get update && apt-get install -y bash

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend files
COPY . .

# Expose backend port
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
