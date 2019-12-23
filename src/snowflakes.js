// parcel doesn't import .svg files as strings
import flake1 from './snowflake.svg.html'
import flake2 from './snowflake2.svg.html'
import './snowflakes.css'

const snowflakes = {} // default export object
const flakeStrings = [
  flake1,
  flake2
]
let snowflakeCount = 90
let flakes = new Array(snowflakeCount).fill(null).map(createFlake)
let enableAnimation = true
let windFactor = Math.ceil(Math.random() * 2) - 1
let speed = 1
const windCap = 2

snowflakes.updateCount = (newCount) => {
  newCount = parseInt(newCount)
  if (!newCount || newCount < 0) return
  snowflakeCount = newCount
  flakes.forEach(flake => {
    flake.element.remove()
  })
  flakes = new Array(snowflakeCount).fill(null).map(createFlake)
}

snowflakes.updateSpeed = (newSpeed) => {
  if (!newSpeed) return
  newSpeed = parseFloat(newSpeed)
  if (newSpeed < 0 || newSpeed > 10) return
  speed = newSpeed
}

function createFlake () {
  const flakeString = flakeStrings[Math.floor(Math.random() * flakeStrings.length)]
  const wrapper = document.createElement('div')
  wrapper.innerHTML = flakeString
  const flakeSvg = wrapper.querySelector('svg')
  const size = Math.random() // 0 to 1
  // between -5 and 105 to allow flakes slightly outside viewport
  const positionX = Math.random() * 116
  const positionY = Math.random() * 116

  document.body.appendChild(wrapper)

  flakeSvg.classList.add('snowflake')
  flakeSvg.style.height = (size * 30 + 10) + 'px'

  return {
    element: flakeSvg,
    x: positionX,
    y: positionY,
    size: size,
    velocity: (size + 0.4) / 3, // let smaller flakes move slower
    rotation: 0,
    // rotate counter clockwise for negative values
    rotationVelocity: (Math.random() * 2) - 1
  }
}

snowflakes.start = () => {
  window.requestAnimationFrame(step)
}

snowflakes.toggle = () => {
  (enableAnimation = !enableAnimation) && snowflakes.start()
}

function step () {
  if (!enableAnimation) return
  if (windFactor > windCap) {
    windFactor -= 0.1
  } else if (windFactor < -windCap) {
    windFactor += 0.1
  } else if (Math.random() > 0.9) {
    // common wind for all flakes. only change every 10th step randomly.
    windFactor += (Math.random() / 10) - 0.05
  }
  flakes.forEach(flake => {
    // apply wind to each flake based on its velocity
    flake.x += windFactor * flake.velocity * speed
    if (flake.x > 107) flake.x = -6 // when clipped right side, move to left side
    if (flake.x < -7) flake.x = 106 // and vice versa

    // fall down
    flake.y += flake.velocity * speed
    if (flake.y > 107) flake.y = 0

    // rotate
    flake.rotation += flake.rotationVelocity
    if (flake.rotation > 360 || flake.rotation < -360) flake.rotation = 0

    // apply styles
    flake.element.style.transform = `translate(${flake.x}vw, ${flake.y}vh) rotate(${flake.rotation}deg)`
  })

  window.requestAnimationFrame(step)
}

export default snowflakes
