
const mfsjea = require('./mfsjea.js')

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

rl.on('line', (line) => {
  const result = mfsjea.jeamfs(line)
  console.log('BEST RESULT: ' + result.str + ' (' + result.source + '-' + result.destination + ', score: ' + result.score + ')')
})
