# Dockerfile for Next.js frontend

# Specify the base image
FROM node:16-alpine

# Set the working directory
WORKDIR /src

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy app source code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
