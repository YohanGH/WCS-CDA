FROM node:23-alpine3.21

# Installe pnpm
RUN npm install -g pnpm && ln -s /usr/local/bin/pnpm /usr/bin/pnpm

WORKDIR /app

# COPY only necessary files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# COPY tsconfig files
COPY tsconfig.json tsconfig.app.json tsconfig.node.json ./

# COPY vite and other config files
COPY vite.config.ts tailwind.config.js postcss.config.js components.json ./

# COPY HTML and public files
COPY index.html ./index.html
COPY public ./public

# COPY the src and components directories
COPY src ./src

# Expose port
EXPOSE 5173

CMD ["pnpm", "run", "dev", "--host"]
