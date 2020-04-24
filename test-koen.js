
const {Mfsjea, DictionaryScorer} = require('./dist/index.js')
const readline = require('readline')

const words = ''

const dictionary = new Map(words.split(' ').map(word => [word, 1]))
const preprocess = (word) => word.toLowerCase().replace(/[^a-z]/g, '')

const mfsjea = new Mfsjea([Mfsjea.LAYOUTS.DUBEOL_STANDARD, Mfsjea.LAYOUTS.SEBEOL_390, Mfsjea.LAYOUTS.SEBEOL_FINAL], [Mfsjea.LAYOUTS.QWERTY, Mfsjea.LAYOUTS.DVORAK, Mfsjea.LAYOUTS.COLEMAK], [new DictionaryScorer(1, dictionary, preprocess)])

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

rl.on('line', (line) => {
  const result = mfsjea.convertBest(line)
  console.log('BEST RESULT: ' + result.output + ' (' + result.inputName + '-' + result.outputName + ', score: ' + result.score + ')')
})
