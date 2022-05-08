FROM node:18

# install x virtual framebuffer and xdotool for headless use
# and also vnc and Fluxbox so we can watch or stream it in realtime
# and install ffmpeg for video capture
# and install libsdl for izapple2

RUN apt-get update -y
RUN apt-get install -y xvfb xdotool x11vnc fluxbox ffmpeg libsdl2-2.0 curl

# download izapple2 prebuilt

RUN curl -sSL "https://github.com/ivanizag/izapple2/releases/download/v1.2/izapple2sdl_linux" -o /tmp/izapple2sdl_linux
RUN mkdir -p /usr/src/emulator
WORKDIR /usr/src/emulator
RUN mv /tmp/izapple2sdl_linux .
RUN chmod 755 izapple2sdl_linux

# install the bot
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# copy in the bot's dependencies
COPY src/package.json /usr/src/bot
RUN npm install

# copy in the bot
COPY src /usr/src/bot

# start the bot
CMD ["bash", "startup.sh"]
