# syntax = docker/dockerfile:1

# Build stage
FROM node:24-slim AS build

WORKDIR /app

# Install packages needed to build node modules
RUN apt-get update -qq && \
  apt-get install -y python-is-python3 pkg-config build-essential git

# pnpm comes from corepack, pinned by package.json's packageManager field
RUN corepack enable

# Install dependencies for the Astro site
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Copy application code
COPY . .

# Build the Astro site and its map pages
RUN pnpm build

# Production stage - use nginx to serve static files
FROM nginx:alpine

# Copy the built site
COPY --from=build /app/dist /usr/share/nginx/html/site

# Custom nginx config — blocks non-GET methods, uniform 404s
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
