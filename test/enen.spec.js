
const { enen } = require('../dist/index')

test('QWERTY -> Dvorak', () => {
    expect(enen(`svat ussupd ;dlh a kdbk`))
        .toBe(`okay google send a text`)
})

test('QWERTY -> Colemak', () => {
    expect(enen(`yeaj dyydif rfks a gfxg`))
       .toBe(`okay google send a text`)
})
