# Mulistage Build for CI & CD 
# Stage 0 we call it as "Build-Stage", based on Node js to build and compile tghe front end 
# FROM tiangolo/node-frontend:10 as build-stage
FROM node As build-stage
WORKDIR /app
COPY . .
RUN npm install && npm run build 
#simliar to npm install and build 
FROM nginx:alpine
# Stage 1 , na\\based on nginx to have only the compiled build ready for production 
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=build-stage /app/build/ .
#COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

