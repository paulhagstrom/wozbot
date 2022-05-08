FROM debian:bullseye-slim

# install screen stuff

RUN apt-get update -y
RUN apt-get install -y xvfb xdotool x11vnc fluxbox libsdl2-2.0

# download izapple2 prebuilt

RUN curl -sSL "https://github.com/ivanizag/izapple2/releases/download/v1.2/izapple2sdl_linux" -o /tmp/izapple2sdl_linux
RUN mkdir -p /usr/src/emulator
WORKDIR /usr/src/emulator
RUN mv /tmp/izapple2sdl_linux .

CMD ["bash", "startup.sh"]
