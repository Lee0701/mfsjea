
const {Mfsjea} = require('./lib/index.js')
const mfsjea = Mfsjea.DEFAULT_ENKO

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

rl.on('line', (line) => {
  const result = mfsjea.convertBest(line)
  console.log('BEST RESULT: ' + result.output + ' (' + result.inputName + '-' + result.outputName + ', score: ' + result.score + ')')
})
