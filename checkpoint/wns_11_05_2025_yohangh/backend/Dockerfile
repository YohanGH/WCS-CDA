FROM node:20.9.0-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY src ./src
COPY tsconfig.json ./tsconfig.json

ARG NEXT_PUBLIC_GRAPHQL_API_URL
ENV NEXT_PUBLIC_GRAPHQL_API_URL ${NEXT_PUBLIC_GRAPHQL_API_URL}

CMD npm run dev