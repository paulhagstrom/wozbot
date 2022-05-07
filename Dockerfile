FROM node:18

# install the bot
# create the directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# copy in the bot's dependencies
COPY package.json /usr/src/bot
RUN npm install

# copy in the bot
COPY . /usr/src/bot

# install dependencies of dependencies of apple2js

RUN apt-get update -y
RUN apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

# download apple2js and do a static build

RUN curl -sSL "https://github.com/whscullin/apple2js/archive/refs/heads/master.zip" -o /tmp/apple2js.zip
WORKDIR /usr/src/
RUN unzip /tmp/apple2js.zip
RUN mv apple2js-master emulator
WORKDIR /usr/src/emulator
RUN npm install
# this environment variable also used to build on my macOS machine
RUN NODE_OPTIONS=--openssl-legacy-provider npm run build

# install x virtual framebuffer and xdotool for headless use
# and also vnc and Fluxbox so we can watch or stream it in realtime
# and install ffmpeg for video capture

RUN apt-get update -y
RUN apt-get install -y xvfb xdotool x11vnc fluxbox ffmpeg


# start the bot
CMD ["bash", "startup.sh"]
