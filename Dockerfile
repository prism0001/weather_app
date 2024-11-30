# Use the Node.js image with the specific version
FROM node:22.11.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the files from your local directory to the container
COPY . .

# Expose the frontend port (Vite runs on 5173 by default)
EXPOSE 5173

# Expose the backend port (your server might be running on port 5000)
EXPOSE 5000

# Run the backend and frontend concurrently when the container starts
CMD ["npm", "start"]