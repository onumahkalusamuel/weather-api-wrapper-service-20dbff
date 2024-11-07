# Stage 1: Build frontend assets with Yarn
FROM node:22 AS frontend-builder

# Set working directory to /app
WORKDIR /app

# Copy only the frontend files to optimize caching
COPY . ./
RUN yarn install

# Copy frontend source files and build the frontend
RUN yarn build:frontend

# Stage 2: Install backend dependencies and copy assets
FROM node:22 AS production

# Set working directory to /app
WORKDIR /app

# Copy backend package.json for dependency installation
COPY backend/package.json ./
RUN npm install

# Copy all backend source code and the built frontend assets
COPY backend ./
COPY --from=frontend-builder /app/frontend/dist ./web/dist

# Expose the application port (change as needed)
EXPOSE 3000

# Command to start the application
CMD ["npm", "run", "start"]
