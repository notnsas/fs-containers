# The first FROM is now a stage called build-stage
FROM node:24 AS build-stage
WORKDIR /usr/src/app

COPY . .

# COPY /package.json /package-lock.json ./

RUN npm cache clean --force

RUN ls -la >&2

RUN pwd >&2

RUN npm ci

RUN npm run build


# This is a new stage, everything before this is gone, except for the files that we want to COPY
FROM nginx

# COPY the directory dist from the build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html