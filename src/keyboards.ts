
import * as Hangul from './hangul'

const LAYOUT_EN_QWERTY = ' `~1!2@3#4$5%6^7&8*9(0)-_=+\\|qQwWeErRtTyYuUiIoOpP[{]}aAsSdDfFgGhHjJkKlL;:\'"zZxXcCvVbBnNmM,<.>/?'
const LAYOUT_EN_DVORAK = ' `~1!2@3#4$5%6^7&8*9(0)[{]}\\|\'",<.>pPyYfFgGcCrRlL/?=+aAoOeEuUiIdDhHtTnNsS\-_;:qQjJkKxXbBmMwWvVzZ'
const LAYOUT_EN_COLEMAK = ' `~1!2@3#4$5%6^7&8*9(0)-_=+\\|qQwWfFpPgGjJlLuUyY;:[{]}aArRsStTdDhHnNeEiIoO\'"zZxXcCvVbBkKmM,<.>/?'

const LAYOUT_KO_2SET_KS = ' `~1!2@3#4$5%6^7&8*9(0)-_=+\\|ㅂㅃㅈㅉㄷㄸㄱㄲㅅㅆㅛㅛㅕㅕㅑㅑㅐㅒㅔㅖ[{]}ㅁㅁㄴㄴㅇㅇㄹㄹㅎㅎㅗㅗㅓㅓㅏㅏㅣㅣ;:\'"ㅋㅋㅌㅌㅊㅊㅍㅍㅠㅠㅜㅜㅡㅡ,<.>/?'
const LAYOUT_KO_3SET_390 = ' `~ᇂᆽᆻ@ᆸ#ᅭ$ᅲ%ᅣ^ᅨ&ᅴ*ᅮ(ᄏ)-_=+\\|ᆺᇁᆯᇀᅧᆿᅢᅤᅥ;ᄅ<ᄃ7ᄆ8ᄎ9ᄑ>[{]}ᆼᆮᆫᆭᅵᆰᅡᆩᅳ/ᄂ\'ᄋ4ᄀ5ᄌ6ᄇ:ᄐ"ᆷᆾᆨᆹᅦᆱᅩᆶᅮ!ᄉ0ᄒ1,2.3ᅩ?'
const LAYOUT_KO_2SET_391 = ' *※ᇂᆩᆻᆰᆸᆽᅭᆵᅲᆴᅣ=ᅨ“ᅴ”ᅮ\'ᄏ~);>+:\\ᆺᇁᆯᇀᅧᆬᅢᆶᅥᆳᄅ5ᄃ6ᄆ7ᄎ8ᄑ9(%</ᆼᆮᆫᆭᅵᆲᅡᆱᅳᅤᄂ0ᄋ1ᄀ2ᄌ3ᄇ4ᄐ·ᆷᆾᆨᆹᅦᆿᅩᆪᅮ?ᄉ-ᄒ",,..ᅩ!'

const COMB_KO_2SET_KS: Record<string, string> = {'ᅩᅡ': 'ᅪ', 'ᅩᅢ': 'ᅫ', 'ᅩᅵ': 'ᅬ', 'ᅮᅥ': 'ᅯ', 'ᅮᅦ': 'ᅰ', 'ᅮᅵ': 'ᅱ', 'ᅳᅵ': 'ᅴ', 'ᆨᆺ': 'ᆪ', 'ᆫᆽ': 'ᆬ', 'ᆫᇂ': 'ᆭ', 'ᆯᆨ': 'ᆰ', 'ᆯᆷ': 'ᆱ', 'ᆯᆸ': 'ᆲ', 'ᆯᆺ': 'ᆳ', 'ᆯᇀ': 'ᆴ', 'ᆯᇁ': 'ᆵ', 'ᆯᇂ': 'ᆶ', 'ᆸᆺ': 'ᆹ'}
const COMB_KO_3SET_390: Record<string, string> = {'ᄀᄀ':'ᄁ', 'ᄃᄃ':'ᄄ', 'ᄇᄇ':'ᄈ', 'ᄉᄉ':'ᄊ', 'ᄌᄌ':'ᄍ', 'ᅩᅡ':'ᅪ', 'ᅩᅢ':'ᅫ', 'ᅩᅵ':'ᅬ', 'ᅮᅥ':'ᅯ', 'ᅮᅦ':'ᅰ', 'ᅮᅵ':'ᅱ', 'ᅳᅵ':'ᅴ', 'ᆨᆨ':'ᆩ', 'ᆨᆺ':'ᆪ', 'ᆫᆽ':'ᆬ', 'ᆫᇂ':'ᆭ', 'ᆯᆨ':'ᆰ', 'ᆯᆷ':'ᆱ', 'ᆯᆸ':'ᆲ', 'ᆯᆺ':'ᆳ', 'ᆯᇀ':'ᆴ', 'ᆯᇁ':'ᆵ', 'ᆯᇂ':'ᆶ', 'ᆸᆺ':'ᆹ', 'ᆺᆺ':'ᆻ'}
const COMB_KO_3SET_FINAL: Record<string, string> = {'ᄀᄀ':'ᄁ', 'ᄃᄃ':'ᄄ', 'ᄇᄇ':'ᄈ', 'ᄉᄉ':'ᄊ', 'ᄌᄌ':'ᄍ', 'ᅩᅡ':'ᅪ', 'ᅩᅢ':'ᅫ', 'ᅩᅵ':'ᅬ', 'ᅮᅥ':'ᅯ', 'ᅮᅦ':'ᅰ', 'ᅮᅵ':'ᅱ', 'ᅳᅵ':'ᅴ'} // STRICT mode.

/**
 * Combines Hangul jamo by a given combination rules table.
 * @param table an combination rules table.
 * @param text an input text.
 * @returns input text, combinations applied.
 */
function combine(table: Record<string, string>, text: string): string {
    const combined = text.split('')
        .reduce((a: string[], c: string) => {
            if(a.length == 0) return [c]
            const key = a[a.length - 1] + c
            if(table[key]) return [...a.slice(0, a.length - 1), table[key]]
            return [...a, c]
        }, [])
    return combined.join('')
}

/**
 * Holds informations about the keyboard layout used in conversion.
 */
export class Keyboard {
    name: string
    layout: string
    constructor(name: string, layout: string) {
        this.name = name
        this.layout = layout
    }
    encode(text: string): number[] {
        return text.split('').map((c) => this.layout.indexOf(c))
    }
    decode(codes: number[]): string {
        return codes.map((c) => c == -1 ? '\ufffd' : this.layout[c]).join('')
    }
}

/**
 * A keyboard type for Hangul layouts.
 */
export class HangulKeyboard extends Keyboard {
    combination: Record<string, string>
    constructor(name: string, layout: string, combination: Record<string, string>) {
        super(name, layout)
        this.combination = combination
    }
    encode(text: string): number[] {
        return super.encode(text.normalize('NFD'))
    }
    decode(codes: number[]): string {
        const decomposed = super.decode(codes)
        return combine(this.combination, decomposed).normalize('NFC')
    }
}

/**
 * A specialised keyboard type for Hangul 2-set methods.
 */
export class Hangul2SetKeyboard extends Keyboard {
    combination: Record<string, string>
    constructor(name: string, layout: string, combination: Record<string, string>) {
        super(name, layout)
        this.combination = combination
    }
    encode(text: string): number[] {
        return super.encode(text.normalize('NFD'))
    }
    decode(codes: number[]): string {
        const decomposed = super.decode(codes).split('')
        const converted = decomposed.reduce((a: string[], c: string) => {
            const cho = Hangul.toCho(c)
            const jung = Hangul.toJung(c)
            const jong = Hangul.toJong(c)

            if(a.length == 0) return [Hangul.isCompatJung(c) ? jong : cho]
            const last = a[a.length - 1]

            if(Hangul.isCompatJung(c) && Hangul.isJong(last)) {
                // Ghost light
                const elevatedCho = Hangul.elevateCho(last)
                return [...a.slice(0, a.length - 1), elevatedCho, jung]
            }
            if(Hangul.isCompatCho(c)) {
                if(Hangul.isJung(last) || Hangul.isJong(last)) {
                    return [...a, jong]
                }
                return [...a, cho]
            }
            if(Hangul.isCompatJung(c)) {
                return [...a, jung]
            }
            return [...a, c]
        }, [])
        return combine(this.combination, converted.join('')).normalize('NFC')
    }
}

export const presetEnKeyboards = [
    new Keyboard('QWERTY', LAYOUT_EN_QWERTY),
    new Keyboard('Dvorak', LAYOUT_EN_DVORAK),
    new Keyboard('Colemak', LAYOUT_EN_COLEMAK),
]

export const presetKoKeyboards = [
    new Hangul2SetKeyboard('두벌식 표준', LAYOUT_KO_2SET_KS, COMB_KO_2SET_KS),
    new HangulKeyboard('세벌식 390', LAYOUT_KO_3SET_390, COMB_KO_3SET_390),
    new HangulKeyboard('세벌식 최종', LAYOUT_KO_2SET_391, COMB_KO_3SET_FINAL),
]

export const presetKeyboards = [
    ...presetEnKeyboards,
    ...presetKoKeyboards,
]
