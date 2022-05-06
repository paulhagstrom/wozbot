FROM node:18

# download and compile and install linapple

RUN curl -sSL "https://github.com/linappleii/linapple/archive/refs/heads/master.zip" -o /tmp/linapple.zip
RUN mkdir -p /usr/src/linapple
WORKDIR /usr/src
RUN unzip /tmp/linapple.zip
WORKDIR /usr/src/linapple-master
RUN apt-get update -y
RUN apt-get install -y git libzip-dev libsdl1.2-dev libsdl-image1.2-dev libcurl4-openssl-dev zlib1g-dev imagemagick
RUN make
RUN make install
RUN mkdir -p /root/.linapple
RUN mkdir -p /root/.config
RUN mkdir -p /root/.linapple/disks/
RUN mkdir -p /root/.config/linapple/
RUN cp /usr/local/etc/linapple/linapple.conf /root/.config/linapple/
RUN cp /usr/local/share/linapple/Master.dsk /root/.linapple/disks/

# install ffmpeg for viedeo capture

RUN apt-get install -y ffmpeg

# install x virtual framebuffer and xdotool for headless use
# and also vnc and Fluxbox so we can watch or stream it in realtime

RUN apt-get install -y xvfb xdotool x11vnc fluxbox

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
#CMD ["node", "index.js"]
CMD ["bash", "startup.sh"]
