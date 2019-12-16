const snowflakes = {} // default export object
const flakeSvgTemplates = [
  document.getElementById('flakeSvg1'),
  document.getElementById('flakeSvg2')
]
const snowflakeCount = 100
const rootNode = document.body
const flakes = new Array(snowflakeCount).fill(null).map(createFlake)
let enableAnimation = true
let windFactor = Math.ceil(Math.random() * 2) - 1
const windCap = 2

function createFlake () {
  const template = flakeSvgTemplates[Math.floor(Math.random() * flakeSvgTemplates.length)]
  const clone = document.importNode(template.content, true)
  const flake = clone.querySelector('svg')
  const size = Math.random() // 0-1
  const positionX = Math.random() * 110 - 5
  const positionY = Math.random() * 100 - 10

  rootNode.appendChild(clone)

  flake.data = {
    x: positionX,
    y: positionY,
    size: size,
    velocity: (size + 0.4) / 3, // let smaller flakes move slower
    rotation: 0,
    rotationVelocity: (Math.random() * 2) - 1
  }

  flake.classList.add('snowflake')
  flake.style.height = (size * 30 + 10) + 'px'

  return flake
}

snowflakes.start = () => {
  window.requestAnimationFrame(step)
}

// todo: fix toggle (dunno why this not working)
snowflakes.toggle = () => {
  (enableAnimation = !enableAnimation) && snowflakes.start()
}

function step () {
  if (!enableAnimation) return
  // let 5 be strongest wind
  if (windFactor > windCap) {
    windFactor -= 0.1
  } else if (windFactor < -windCap) {
    windFactor += 0.1
  } else if (Math.random() > 0.9) {
    // common wind for all flakes. only change every 10th step randomly.
    windFactor += (Math.random() / 10) - 0.05
  }
  flakes.forEach(flake => {
    flake.data.x += windFactor * flake.data.velocity
    if (flake.data.x > 107) flake.data.x = -6 // when clipped right side, move to left side
    if (flake.data.x < -7) flake.data.x = 106 // and vice versa

    // fall down (bigger = quicker)
    flake.data.y += flake.data.velocity
    if (flake.data.y > 107) flake.data.y = 0

    // rotate
    flake.data.rotation += flake.data.rotationVelocity
    if (flake.data.rotation > 360 || flake.data.rotation < -360) flake.data.rotation = 0

    // apply styles
    flake.style.transform = `translate(${flake.data.x}vw, ${flake.data.y}vh) rotate(${flake.data.rotation}deg)`
  })
  window.requestAnimationFrame(step)
}

export default snowflakes
