FROM node:10.7.0-alpine AS dashboard
ENV NODE_ENV="production"
WORKDIR /usr/local/app/
COPY ./dashboard/package.json ./dashboard/package-lock.json ./
RUN npm ci && node ./node_modules/node-sass/scripts/install.js && npm rebuild node-sass
COPY ./dashboard ./
RUN npm run build

FROM node:10.7.0-alpine AS server
ENV NODE_ENV="production"
WORKDIR /usr/local/app/
COPY ./server/package.json ./server/package-lock.json ./
RUN npm ci
COPY ./server ./
RUN npm run build

FROM node:10.7.0-alpine
WORKDIR /usr/local/app/
COPY --from=dashboard /usr/local/app/build ./public/
COPY --from=server /usr/local/app/dist ./dist/
COPY --from=server /usr/local/app/node_modules ./node_modules/
COPY --from=server /usr/local/app/package.json /usr/local/app/package-lock.json ./
ENTRYPOINT ["npm","run","start"]
