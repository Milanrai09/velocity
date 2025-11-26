FROM ubuntu:22.04

# Install basic tools
RUN apt-get update
RUN apt-get update && apt-get install -y curl git zip

# Install Node.js 20
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs

WORKDIR /home/app

COPY package*.json ./
RUN npm install

COPY script.js script.js
COPY main.sh main.sh
RUN chmod +x main.sh

ENTRYPOINT ["/home/app/main.sh"]
