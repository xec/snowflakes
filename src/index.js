import snowflakes from './snowflakes'

snowflakes.start()
// document.getElementById('toggleFlakes').addEventListener('click', () => snowflakes.toggle())
document.addEventListener('keypress', (e) => {
  if (e.keyCode === 112) snowflakes.toggle()
})
