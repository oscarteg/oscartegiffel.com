# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.2.19-debian
FROM oven/bun:${BUN_VERSION} as base

LABEL fly_launch_runtime="Bun"

# Bun app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=production


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
  apt-get install -y python-is-python3 pkg-config build-essential git

# Install dependencies
COPY --link package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy application code
COPY --link . .

# Build application
RUN bun run build

# Remove development dependencies
RUN bun install --production --frozen-lockfile


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
CMD [ "bun", "run", "preview" ]
