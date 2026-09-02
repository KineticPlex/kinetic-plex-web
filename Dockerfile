# ==========================================
# Stage 1: Build (Builder)
# ==========================================
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy dependency manifest files
COPY package.json yarn.lock ./

# Install dependencies deterministically using the lockfile
RUN yarn install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Build the application for production
RUN yarn build

# ==========================================
# Stage 2: Production (Nginx Server)
# ==========================================
FROM nginx:alpine

# Change Nginx default port from 80 to 9000
RUN sed -i 's/listen.*/listen 9000;/g' /etc/nginx/conf.d/default.conf

# Optional: Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy the compiled files from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port Nginx will listen on
EXPOSE 9000

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]