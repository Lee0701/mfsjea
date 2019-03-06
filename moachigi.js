
const composeString = (str) => [...str].reduce((a, c) => a.slice(0, -1).concat(compose(a[a.length-1], convert(c))), [0]).flatMap(code => reverse(code)).join('').normalize('NFC')

const convert = (c) => isCho(c) ? 0x10000000 | (code(c) & 0xff) + 0x01 << 0x10 : isJung(c) ? 0x10000000 | (code(c) & 0xff) - 0x60 << 0x08 : isJong(c) ? 0x10000000 | (code(c) & 0xff) - 0xa7 : code(c)
const reverse = (code) => (isHangulCode(code) ? decode(code) : [(code & 0xffffff)]).filter(code => code != 0).map(code => String.fromCharCode(code)).join('')
const decode = (code) => [0x1100 | ((code & 0xff0000) >> 0x10) - 0x01, 0x1100 | ((code & 0xff00) >> 0x08) + 0x60, hasJong(code) ? (0x1100 | (code & 0xff) + 0xa7) : 0]

const compose = (composing, input) => hasCho(input) ? cho(composing, input) : hasJung(input) ? jung(composing, input) : hasJong(input) ? jong(composing, input) : [composing, input]

const isCho = (input) => range(input.charCodeAt(0), 0x1100, 0x1112)
const isJung = (input) => range(input.charCodeAt(0), 0x1161, 0x1175)
const isJong = (input) => range(input.charCodeAt(0), 0x11a8, 0x11c2)
const range = (num, a, b) => num >= a && num <= b
const code = (c) => c.charCodeAt(0)

const hasCho = (code) => isHangulCode(code) && (code & 0xff0000) != 0
const hasJung = (code) => isHangulCode(code) && (code & 0xff00) != 0
const hasJong = (code) => isHangulCode(code) && (code & 0xff) != 0

const isHangulCode = (code) => (code & 0x10000000) != 0

const cho = (composing, input) => isHangulCode(composing) ? hasCho(composing) ? [composing, input] : composing | input : [composing, input]
const jung = (composing, input) => isHangulCode(composing) ? hasJung(composing) ? [composing, input] : composing | input : [composing, input]
const jong = (composing, input) => isHangulCode(composing) ? hasJong(composing) ? [composing, input] : composing | input : [composing, input]

module.exports = composeString
