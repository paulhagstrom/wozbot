FROM node:18

# install dependencies of dependencies of apple2js

RUN apt-get update -y
RUN apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

# download apple2js and do a static build

RUN curl -sSL "https://github.com/whscullin/apple2js/archive/refs/heads/master.zip" -o /tmp/apple2js.zip
RUN mkdir -p /usr/src/
WORKDIR /usr/src/
RUN unzip /tmp/apple2js.zip
RUN mv apple2js-master emulator
WORKDIR /usr/src/emulator
RUN npm install

# install http-server
RUN npm install http-server

# Build static deployment
# SSL legacy environment variable also used to build on my macOS machine
# note: to make it through the build I needed to add a swapfile to my machine
# also ran out of heap memory doing webpack on VM, heap size increase needed

RUN NODE_OPTIONS="--openssl-legacy-provider --max-old-space-size=2048" npm run build

# Copy in the disk images
RUN mkdir -p /usr/src/emulator/disks
COPY disks /usr/src/emulator/disks

# JSONify the disks and start the web server
CMD ["bash", "startup.sh"]
