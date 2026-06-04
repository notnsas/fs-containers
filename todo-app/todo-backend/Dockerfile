FROM node:24
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci 

# ENV DEBUG=playground:*
  
USER node

CMD ["npm", "start"]

HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://app:8080/api/todos || exit 1
