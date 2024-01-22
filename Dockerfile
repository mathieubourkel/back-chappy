# Utiliser une image Node.js comme base
FROM node:20.10.0-alpine as base
RUN apk add --no-cache tzdata
LABEL maintainer="Laetitia Ashry, Jeremy Laigle, Mathieu Bourkel"
WORKDIR /app
COPY --chown=node:node package.json .

FROM base as build
RUN npm install --silent

FROM base as clean-node-modules
RUN npm install --omit=dev

FROM build as buildprod
COPY . .
RUN npm run build

FROM base as builddev
RUN npm install --silent && npm install -g ts-node

FROM base AS development
LABEL version='development'
COPY --chown=node:node --from=builddev /app/node_modules /app/node_modules
CMD ["npm", "run", "dev"]

FROM base AS production
LABEL version='production'
COPY --chown=node:node --from=clean-node-modules /app/node_modules /app/node_modules
COPY --chown=node:node --from=buildprod /app/build /app/build
CMD ["node", "build/index.js"]