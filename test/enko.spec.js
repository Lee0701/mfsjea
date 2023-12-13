
const { enko } = require('../dist/index')

test('One equals one', () => {
    expect(1).toBe(1)
})

test('QWERTY -> 2-Set KS', () => {
    expect(enko(`ekfkawnl gjs cptqkznldp xkrhvk`))
        .toBe(`다람쥐 헌 쳇바퀴에 타고파`)
    expect(enko(`zltmdml rhdb whrjsdms dlqtnfRlfl aksskdi gkrh xmrqufgks rltnfdms vlfdycl dksgek.`))
        .toBe(`키스의 고유 조건은 입술끼리 만나야 하고 특별한 기술은 필요치 않다.`)
})

test('QWERTY -> 3-Set 390', () => {
    expect(enko(`ufyfzl9d mts ocq;f09djc 'fkvpf`))
        .toBe(`다람쥐 헌 쳇바퀴에 타고파`)
    expect(enko(`0dngj8 kvj5 lvktsjgs jd3nbwkkdyd ifshfj6 mfkv 'gx;ewmfs kdnbwjgs pdwj4od jfSuf.`))
        .toBe(`키스의 고유 조건은 입술끼리 만나야 하고 특별한 기술은 필요치 않다.`)
})
