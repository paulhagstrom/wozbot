FROM node:18

# install x virtual framebuffer and xdotool for headless use
# and also vnc and Fluxbox so we can watch or stream it in realtime
# and install ffmpeg for video capture

RUN apt-get update -y
RUN apt-get install -y xvfb xdotool x11vnc fluxbox ffmpeg

# install the bot
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# copy in the bot's dependencies
COPY src/package.json /usr/src/bot
RUN npm install

# copy in the bot
COPY . /usr/src/bot

# start the bot
CMD ["bash", "startup.sh"]
