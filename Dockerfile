FROM node:18

# install x virtual framebuffer and xdotool for headless use
# and also vnc and Fluxbox so we can watch or stream it in realtime
# and install ffmpeg for video capture

RUN apt-get update -y
RUN apt-get install -y xvfb xdotool x11vnc fluxbox ffmpeg

# download apple2js and do a static build

RUN curl -sSL "https://github.com/whscullin/apple2js/archive/refs/heads/master.zip" -o /tmp/apple2js.zip
RUN mkdir -p /usr/src/emulator
WORKDIR /usr/src/emulator
RUN unzip /tmp/apple2js.zip
WORKDIR /usr/src/emulator
RUN npm install
RUN npm run build

# install the bot
# create the directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# copy in the bot's dependencies
COPY package.json /usr/src/bot
RUN npm install

# copy in the bot
COPY . /usr/src/bot

# start the bot
CMD ["bash", "startup.sh"]
