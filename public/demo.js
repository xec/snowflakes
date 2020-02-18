import snowflakes from '../src/snowflakes'

snowflakes.start()
// document.getElementById('toggleFlakes').addEventListener('click', () => snowflakes.toggle())
document.addEventListener('keypress', (e) => {
  if (e.key === 'p') snowflakes.toggle()
  if (e.key === 'c') snowflakes.updateCount(window.prompt('Update count'))
  if (e.key === 's') snowflakes.updateSpeed(window.prompt('Update speed (0-10, 1 is default)'))
})
