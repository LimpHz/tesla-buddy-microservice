# Use official Playwright image with all browser dependencies
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# Accept GitHub token as build argument
ARG NPM_TOKEN

# Set working directory
WORKDIR /usr/src/app

# Set up .npmrc for GitHub Packages authentication using the existing .npmrc content
COPY .npmrc .npmrc
RUN printf "\n//npm.pkg.github.com/:_authToken=${NPM_TOKEN}\n" >> .npmrc

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build TypeScript
RUN npx tsc

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "run", "build:start"]
