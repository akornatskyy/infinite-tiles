# Infinite Tiles

[![Build Status](https://travis-ci.org/akornatskyy/infinite-tiles.svg?branch=master)](https://travis-ci.org/akornatskyy/infinite-tiles)
[![Dependency Status](https://gemnasium.com/badges/github.com/akornatskyy/infinite-tiles.svg)](https://gemnasium.com/github.com/akornatskyy/infinite-tiles)

## Setup

Install dependencies with [npm](https://www.npmjs.com):

    npm i
    npm run lint

Build resources with *mock* api strategy:

    npm run build

or *ws* (web socket), production build:

    NODE_ENV=prod API=ws WS_HOST=ws://192.168.56.10:8080/game npm run build

## Run

Serve files with a web server with hot loading:

    npm start

Open your browser at [http://localhost:8080](http://localhost:8080).
