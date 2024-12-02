# Step 1: Build the React app with Bun
FROM node:slim AS build

# Set the working directory
WORKDIR /app

# Copy the package files
COPY package.json ./

# Install dependencies using Bun
RUN npm install

# Copy the rest of the app
COPY . .

# Set environment variable for React build (REACT_APP_SERVER_URL)
ARG REACT_APP_SERVER_URL
ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL

# Build the React app using Bun
RUN npm run build

# Step 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
