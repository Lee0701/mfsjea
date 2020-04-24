
import SimpleKeyboard from './SimpleKeyboard'

export default class Hangul2Keyboard extends SimpleKeyboard {
    static COMPAT_CHO = 'ㄱㄲㄳㄴㄵㄶㄷㄸㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅃㅄㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'
    static COMPAT_JUNG = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'
    static CONVERT_CHO = 'ᄀᄁ\0ᄂ\0\0ᄃᄄᄅ\0\0\0\0\0\0\0ᄆᄇᄈ\0ᄉᄊᄋᄌᄍᄎᄏᄐᄑᄒ'
    static CONVERT_JUNG = 'ᅡᅢᅣᅤᅥᅦᅧᅨᅩᅪᅫᅬᅭᅮᅯᅰᅱᅲᅳᅴᅵ'
    static CONVERT_JONG = 'ᆨᆩᆪᆫᆬᆭᆮ\0ᆯᆰᆱᆲᆳᆴᆵᆶᆷᆸ\0ᆹᆺᆻᆼᆽ\0ᆾᆿᇀᇁᇂ'
    static COMPAT_JAMO = Hangul2Keyboard.COMPAT_CHO + Hangul2Keyboard.COMPAT_JUNG + Hangul2Keyboard.COMPAT_CHO
    static STANDARD_JAMO = Hangul2Keyboard.CONVERT_CHO + Hangul2Keyboard.CONVERT_JUNG + Hangul2Keyboard.CONVERT_JONG
    combinations: Map<string, string>
    decombinations: Map<string, string>
    constructor(name: string, layout: string[], combinations: Map<string, string>) {
        super(name, layout)
        this.combinations = combinations
        this.decombinations = new Map(Array.from(combinations.entries()).map(e => [e[1], e[0]]))
    }
    convertFrom(input: string): number[] {
        return super.convertFrom(this.standardJamoToCompatJamo(this.decombinate(input.normalize('NFD'))))
    }
    convertTo(input: number[]): string {
        return this.combinate(this.compatJamoToStandardJamo(super.convertTo(input))).normalize('NFC')
    }
    combinate(input: string): string {
        return input.split('').reduce((a, c) => {
            const sequence = a.charAt(a.length - 1) + c
            return a.slice(0, a.length - 1) + (this.combinations.get(sequence) || sequence)
        }, '')
    }
    decombinate(input: string): string {
        return input.split('').map(c => this.decombinations.get(c) || c).join('')
    }
    compatJamoToStandardJamo(input: string): string {
        const convertCho = (c: string) => c.split('').map(d => Hangul2Keyboard.CONVERT_CHO[Hangul2Keyboard.COMPAT_CHO.indexOf(d)]).join('')
        const convertJung = (c: string) => c.split('').map(d => Hangul2Keyboard.CONVERT_JUNG[Hangul2Keyboard.COMPAT_JUNG.indexOf(d)]).join('')
        const convertJong = (c) => c ? c.split('').map(d => Hangul2Keyboard.CONVERT_JONG[Hangul2Keyboard.COMPAT_CHO.indexOf(d)]).join('') : ''
        return input.replace(/([ㄱ-ㅎ])([ㅏ-ㅣ][ㅏ-ㅣ]?)([ㄱ-ㅎ]?[ㄱ-ㅎ]?)(?![ㅏ-ㅣ])/g, (_, cho, jung, jong) =>
                convertCho(cho) + convertJung(jung) + convertJong(jong))
    }
    standardJamoToCompatJamo(input: string): string {
        return input.split('').map(c => Hangul2Keyboard.COMPAT_JAMO[Hangul2Keyboard.STANDARD_JAMO.indexOf(c)] || c).join('')
    }
}
