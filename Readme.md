# Falling snowflakes

Transparent svg snowflakes on your website.

## Features

* Falling
* Spinning
* Blowing wind
* Random sizes
* Parallax effect

## Demo

https://xec.github.io/snowflakes

## Usage

### Install

Requires [Node.js](https://nodejs.org/) installed

```bash
npm i -D @xec/snowflakes
```

### Run

```js
import snowflakes from '@xec/snowflakes'

// generate flakes and start animation
snowflakes.start()

// stop animation
snowflakes.stop()

// toggle animation on/off
snowflakes.toggle()

// set flake count, default is 90
snowflakes.updateCount(int)

// set speed, default is 1, recommended between 0.1 and 10
snowflakes.updateSpeed(float)
```