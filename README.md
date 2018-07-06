# Infinite Tiles

[![Build Status](https://travis-ci.org/akornatskyy/infinite-tiles.svg?branch=master)](https://travis-ci.org/akornatskyy/infinite-tiles)

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

## Protocol

### Packet format

The server accepts connections from web socket client and communicates with it
using *packets*. A packet is a sequence of bytes sent over the web socket
connection using [messagepack](https://msgpack.org/) serialization format.

![network protocol](./network-protocol.png)

The meaning of a packet depends on packet type.

| Field Name | Field Type | Notes                                          |
| ---------- | ---------- | ---------------------------------------------- |
| t          | string     | Packet type. Limited to known packet types.    |
|            |            | Depends on the packet type, see details below. |

### errors

Sent by the server when packet validation fails.

| Field Name | Field Type         | Notes                                                        |
| ---------- | ------------------ | ------------------------------------------------------------ |
| t          | string             | errors                                                       |
| errors     | map of string list | The map uses  a key to refer to a particular packet field name and a list of strings for multiple error messages. |

### ping

Sent by the client to the server to sync on clock difference.

| Field Name | Field Type | Notes                   |
| ---------- | ---------- | ----------------------- |
| t          | string     | ping                 |
| time       | float      | The client unix timestamp in seconds (including milliseconds as the decimal part). |

### pong

Sent by the server to the client in reply to ping packet.

| Field Name | Field Type | Notes                                                        |
| ---------- | ---------- | ------------------------------------------------------------ |
| t          | string     | pong                                                         |
| tc         | float      | The client unix timestamp as sent in ping packet.            |
| ts         | float      | The server unix timestamp in seconds (including milliseconds as the decimal part).. |


### tiles (viewport change)

Sent by the client when viewport position changes without a need to retrieve corresponding
tiles (because corresponding tile meta information available already).

| Field Name | Field Type                        | Notes                                                        |
| ---------- | --------------------------------- | ------------------------------------------------------------ |
| t          | string                            | tiles                                                        |
| area       | list of int; [xmin, ymin, dx, dy] | Rectangular area related to current viewport position (left, top) and size (width, height). Exactly 4 elements. |

### tiles (metadata)

Sent by the client when viewport position changes and there is a need to retrieve tile metadata.

| Field Name | Field Type                        | Notes                                                        |
| ---------- | --------------------------------- | ------------------------------------------------------------ |
| t          | string                            | tiles                                                        |
| area       | list of int; [xmin, ymin, dx, dy] | see above.                                                   |
| ref        | unsigned byte, [0..127]           | Reference number to match the server response. Incremented for each new request. |
| coords     | list of int; [x,y,...]            | The list of tiles coordinates relative to area xmin, ymin parameters. The length is even number. |

Sent by the server in response to the client request.

| Field Name | Field Type      | Notes                                                        |
| ---------- | --------------- | ------------------------------------------------------------ |
| t          | string          | tiles                                                        |
| ref        | unsigned byte   | Reference number, returned back by the server to match the client request. |
| data       | list of objects | The list of tile metadata corresponding to request coords positions. |

### place

Sent by the client to create a new object at given tile.

| Field Name | Field Type | Notes                         |
| ---------- | ---------- | ----------------------------- |
| t          | string     | place                         |
| x          | int        | The target tile x-coordinate. |
| y          | int        | The target tile y-coordinate. |

Sent by the server to the client to instruct place multiple objects at the given tile coordinates.

| Field Name | Field Type      | Notes                         |
| ---------- | --------------- | ----------------------------- |
| t          | string          | place                         |
| objects    | list of objects | The list of objects to place. |

Object contains any meta information, e.g. id.

| Field Name | Field Type | Notes                         |
| ---------- | ---------- | ----------------------------- |
| id         | string     | Object id.                    |
| x          | int        | The target tile x-coordinate. |
| y          | int        | The target tile y-coordinate. |

### remove

Sent by the server to the client to remove an object by id.

| Field Name | Field Type | Notes                   |
| ---------- | ---------- | ----------------------- |
| t          | string     | removed                 |
| objects         | list of strings | The list of objects to remove by id. |

### move

Sent by the client to the server to move an object to specified tile.


| Field Name | Field Type | Notes                   |
| ---------- | ---------- | ----------------------- |
| t          | string     | move                 |
| id         | string | Object id. |
| x | int | The target tile x-coordinate. |
| y | int | The target tile y-coordinate. |

Sent by the server to the client to instruct move multiple objects to the given tile coordinates.

| Field Name | Field Type      | Notes                        |
| ---------- | --------------- | ---------------------------- |
| t          | string          | move                         |
| objects    | list of objects | The list of objects to move. |

Object contains the following information.

| Field Name | Field Type | Notes                                 |
| ---------- | ---------- | ------------------------------------- |
| id         | string     | Object id.                            |
| x          | int        | The target tile x-coordinate.         |
| y          | int        | The target tile y-coordinate.         |
| time       | int        | The timestamp of the move.            |
| duration   | int        | The overall time to perform the move. |

### moved

Sent by the server to the client to signal an object has been moved to the target tile.

| Field Name | Field Type | Notes      |
| ---------- | ---------- | ---------- |
| t          | string     | move       |
| id         | string     | Object id. |
