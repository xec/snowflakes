import snowflakes from './snowflakes'

snowflakes.start()
document.getElementById('toggleFlakes').addEventListener('click', () => snowflakes.toggle())
