FROM node:23-alpine3.21

# Installe pnpm
RUN npm install -g pnpm && ln -s /usr/local/bin/pnpm /usr/bin/pnpm

WORKDIR /app

# COPY only necessary files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# COPY tsconfig and nodemon config
COPY tsconfig.json nodemon.json ./

# COPY the entire src directory
COPY src ./src

# Expose port
EXPOSE 3310

CMD ["pnpm", "start"]
