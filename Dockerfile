# Name the node stage "builder"
FROM node:15-alpine AS builder

# Set working directory
RUN mkdir /app
WORKDIR /app

# Copy our node module specification
COPY package.json /app
COPY package-lock.json /app

# install node modules and build assets
RUN npm install --production

# Copy all files from current directory to working dir in image
# Except the one defined in '.dockerignore'
COPY . /app

# Create production build of React App
RUN npm run build

# Choose NGINX as our base Docker image
FROM nginx:alpine

# Copy our nginx configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/configfile.template

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf *

# Copy static assets from builder stage
COPY --from=builder /app/build .

# Define environment variables for Cloud Run
ENV PORT 6080
ENV HOST 0.0.0.0
EXPOSE 6080

# Substitute $PORT variable in config file with the one passed via "docker run"
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"

