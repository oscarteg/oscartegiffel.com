# syntax = docker/dockerfile:1

# Build stage
FROM oven/bun:1.2.19-debian as build

WORKDIR /app

# Install packages needed to build node modules
RUN apt-get update -qq && \
  apt-get install -y python-is-python3 pkg-config build-essential git

# Install dependencies — copy workspace manifests first so the lockfile
# resolves the apps/* workspaces too
COPY package.json bun.lock ./
COPY apps/village-map/package.json apps/village-map/package.json
COPY apps/mountain-map/package.json apps/mountain-map/package.json
RUN bun install --frozen-lockfile

# Copy application code
COPY . .

# Build the Astro site (root) and the two SPA bundles
RUN bun run build
RUN bun run --filter village-map build
RUN bun run --filter mountain-map build

# Production stage - use nginx to serve static files
FROM nginx:alpine

# Copy built static files from build stage — one web root per vhost
COPY --from=build /app/dist /usr/share/nginx/html/site
COPY --from=build /app/apps/village-map/dist /usr/share/nginx/html/village-map
COPY --from=build /app/apps/mountain-map/dist /usr/share/nginx/html/mountain-map

# Custom nginx config — blocks non-GET methods, uniform 404s
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
