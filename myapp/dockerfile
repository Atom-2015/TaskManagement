FROM node:20

# Set working directory
WORKDIR /myapp

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the appdocer
CMD ["npm", "start"]
