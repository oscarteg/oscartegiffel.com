# syntax = docker/dockerfile:1

# Build stage
FROM oven/bun:1.2.19-debian as build

WORKDIR /app

# Install packages needed to build node modules
RUN apt-get update -qq && \
  apt-get install -y python-is-python3 pkg-config build-essential git

# Install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy application code
COPY . .

# Build static site
RUN bun run build

# Production stage - use nginx to serve static files
FROM nginx:alpine

# Copy built static files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Custom nginx config — blocks non-GET methods, uniform 404s
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
