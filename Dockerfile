# stage 1: build image
FROM node:16-alpine as builder

RUN apk add --no-cache git

WORKDIR /usr/src/app

RUN yarn set version stable
# Installing dependencies first can save time on rebuilds
# We do need the full (dev) dependencies here
COPY package.json yarn.lock tsconfig.json tsconfig.node.json .env index.html vite.config.ts .yarnrc.yml ./
RUN yarn install

COPY src src
COPY public public
COPY .env .

ARG VITE_GIT_COMMIT
ARG VITE_BUILD_ID
RUN yarn build

# stage 2: resulting image
FROM rma-tools-docker-local.repo.vito.be/httpd:2.4
COPY --from=builder /usr/src/app/build /usr/local/apache2/htdocs

# Copy .env file and shell script to container
WORKDIR /usr/local/apache2/htdocs
COPY .env .


# Start httpd
CMD ["/bin/sh", "-c", "httpd-foreground"]