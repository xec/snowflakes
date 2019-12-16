const snowflakes = {} // default export object
const flakeSvgTemplates = [
  // todo: integrate svg into script instead of relying on templates in html
  document.getElementById('flakeSvg1'),
  document.getElementById('flakeSvg2')
]
const snowflakeCount = 100
const flakes = new Array(snowflakeCount).fill(null).map(createFlake)
let enableAnimation = true
let windFactor = Math.ceil(Math.random() * 2) - 1
const windCap = 2

function createFlake () {
  const template = flakeSvgTemplates[Math.floor(Math.random() * flakeSvgTemplates.length)]
  const clone = document.importNode(template.content, true)
  const flakeSvg = clone.querySelector('svg')
  const size = Math.random() // 0 to 1
  // between -5 and 105 to allow flakes slightly outside viewport
  const positionX = Math.random() * 110 - 5
  const positionY = Math.random() * 100 - 10

  document.body.appendChild(clone)

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
    flake.x += windFactor * flake.velocity
    if (flake.x > 107) flake.x = -6 // when clipped right side, move to left side
    if (flake.x < -7) flake.x = 106 // and vice versa

    // fall down
    flake.y += flake.velocity
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
