const snowflakes = {} // default export object
const flakeSvgTemplate = document.getElementById('flakeSvg')
const snowflakeCount = 20
const rootNode = document.body
// const flakes = new Array(snowflakeCount).fill(null).map(createFlake)
let enableAnimation = true

function createFlake () {
  const clone = document.importNode(flakeSvgTemplate.content, true)
  const flake = clone.querySelector('svg')
  const size = Math.random() * 30 + 10
  const positionX = Math.random() * 110 - 5
  const positionY = Math.random() * 100 - 10
  rootNode.appendChild(clone)
  // flake.data = {
  //   x: positionX,
  //   y: positionY,
  //   size: size
  // }
  flake.style.height = size + 'px'
  flake.style.left = `${positionX}vw`
  // flake.style.top = `${positionY}vh`
  flake.style.top = '-7vh'
  return flake
}

snowflakes.start = () => {
  let flakeCount = snowflakeCount
  while (flakeCount--) {
    let flake = createFlake()
    animateFlake(flake)
  }
  // window.requestAnimationFrame(step)
}

function animateFlake(flake) {
  setTimeout(() => {
    flake.classList.add('fallAnimation')
  }, Math.ceil(Math.random() * 5000))
}

// function animateFlake (flake) {
//  const a = flake.animate(
//     [
//       { top: flake.style.top },
//       { top: '100vh' }
//     ],
//     {
//       delay: Math.ceil(Math.random() * 2000),
//       duration: 2000,
//       iterations: Infinity
//     }
//   )
// }

// todo: fix toggle (dunno why this not working)
snowflakes.toggle = () => {
  (enableAnimation = !enableAnimation) && snowflakes.start()
}

// function step () {
//   if (!enableAnimation) return
//   flakes.forEach(flake => {
//     let currentPos = parseFloat(flake.style.top, 10) || 0
//     // todo: base speed on size (small = slow)
//     // todo: spin slightly?
//     // todo: some sort of sideways flow
//     // todo: animate using translate instead of top
//     if (currentPos > 100) currentPos = -20 // looped flakes start out above visible viewport
//     flake.style.top = (currentPos + 0.2) + 'vh'
//   })
//   window.requestAnimationFrame(step)
// }

export default snowflakes
