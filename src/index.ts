
import {ConvertResult, Keyboard, Scorer} from './types'

import {default as SimpleKeyboard} from './keyboards/SimpleKeyboard'
import {default as Hangul2Keyboard} from './keyboards/Hangul2Keyboard'
import {default as Hangul3Keyboard} from './keyboards/Hangul3Keyboard'

import {default as NonHangulPenaltyScorer} from './scorers/NonHangulPenaltyScorer'
import {default as Hangul2350Scorer} from './scorers/Hangul2350Scorer'
import {default as HangulSyllableFrequencyScorer} from './scorers/HangulSyllableFrequencyScorer'

class Mfsjea {
    static LAYOUTS = {
        QWERTY: new SimpleKeyboard('Qwerty', ' `~1!2@3#4$5%6^7&8*9(0)-_=+\\|qQwWeErRtTyYuUiIoOpP[{]}aAsSdDfFgGhHjJkKlL;:\'"zZxXcCvVbBnNmM,<.>/?'.split('')),
        DVORAK: new SimpleKeyboard('Dvorak', ' `~1!2@3#4$5%6^7&8*9(0)[{]}\\|\'",<.>pPyYfFgGcCrRlL/?=+aAoOeEuUiIdDhHtTnNsS\-_;:qQjJkKxXbBmMwWvVzZ'.split('')),
        COLEMAK: new SimpleKeyboard('Colemak', ' `~1!2@3#4$5%6^7&8*9(0)-_=+\\|qQwWfFpPgGjJlLuUyY;:[{]}aArRsStTdDhHnNeEiIoO\'"zZxXcCvVbBkKmM,<.>/?'.split('')),
        DUBEOL_STANDARD: new Hangul2Keyboard('두벌식 표준', ' `~1!2@3#4$5%6^7&8*9(0)-_=+\\|ㅂㅃㅈㅉㄷㄸㄱㄲㅅㅆㅛㅛㅕㅕㅑㅑㅐㅒㅔㅖ[{]}ㅁㅁㄴㄴㅇㅇㄹㄹㅎㅎㅗㅗㅓㅓㅏㅏㅣㅣ;:\'"ㅋㅋㅌㅌㅊㅊㅍㅍㅠㅠㅜㅜㅡㅡ,<.>/?'.split(''), new Map([['ᅩᅡ', 'ᅪ'], ['ᅩᅢ', 'ᅫ'], ['ᅩᅵ', 'ᅬ'], ['ᅮᅥ', 'ᅯ'], ['ᅮᅦ', 'ᅰ'], ['ᅮᅵ', 'ᅱ'], ['ᅳᅵ', 'ᅴ'], ['ᆨᆺ', 'ᆪ'], ['ᆫᆽ', 'ᆬ'], ['ᆫᇂ', 'ᆭ'], ['ᆯᆨ', 'ᆰ'], ['ᆯᆷ', 'ᆱ'], ['ᆯᆸ', 'ᆲ'], ['ᆯᆺ', 'ᆳ'], ['ᆯᇀ', 'ᆴ'], ['ᆯᇁ', 'ᆵ'], ['ᆯᇂ', 'ᆶ'], ['ᆸᆺ', 'ᆹ']])),
        SEBEOL_390: new Hangul3Keyboard('세벌식 390', ' `~ᇂᆽᆻ@ᆸ#ᅭ$ᅲ%ᅣ^ᅨ&ᅴ*ᅮ(ᄏ)-_=+\\|ᆺᇁᆯᇀᅧᆿᅢᅤᅥ;ᄅ<ᄃ7ᄆ8ᄎ9ᄑ>[{]}ᆼᆮᆫᆭᅵᆰᅡᆩᅳ/ᄂ\'ᄋ4ᄀ5ᄌ6ᄇ:ᄐ"ᆷᆾᆨᆹᅦᆱᅩᆶᅮ!ᄉ0ᄒ1,2.3ᅩ?'.split(''), new Map([['ᄀᄀ', 'ᄁ'], ['ᄃᄃ', 'ᄄ'], ['ᄇᄇ', 'ᄈ'], ['ᄉᄉ', 'ᄊ'], ['ᄌᄌ', 'ᄍ'], ['ᅩᅡ', 'ᅪ'], ['ᅩᅢ', 'ᅫ'], ['ᅩᅵ', 'ᅬ'], ['ᅮᅥ', 'ᅯ'], ['ᅮᅦ', 'ᅰ'], ['ᅮᅵ', 'ᅱ'], ['ᆨᆨ', 'ᆩ'], ['ᆨᆺ', 'ᆪ'], ['ᆫᆽ', 'ᆬ'], ['ᆫᇂ', 'ᆭ'], ['ᆯᆨ', 'ᆰ'], ['ᆯᆷ', 'ᆱ'], ['ᆯᆸ', 'ᆲ'], ['ᆯᆺ', 'ᆳ'], ['ᆯᇀ', 'ᆴ'], ['ᆯᇁ', 'ᆵ'], ['ᆯᇂ', 'ᆶ'], ['ᆸᆺ', 'ᆹ'], ['ᆺᆺ', 'ᆻ']])),
        SEBEOL_FINAL: new Hangul3Keyboard('세벌식 최종', ' *※ᇂᆩᆻᆰᆸᆽᅭᆵᅲᆴᅣ=ᅨ“ᅴ”ᅮ\'ᄏ~);>+:\\ᆺᇁᆯᇀᅧᆬᅢᆶᅥᆳᄅ5ᄃ6ᄆ7ᄎ8ᄑ9(%</ᆼᆮᆫᆭᅵᆲᅡᆱᅳᅤᄂ0ᄋ1ᄀ2ᄌ3ᄇ4ᄐ·ᆷᆾᆨᆹᅦᆿᅩᆪᅮ?ᄉ-ᄒ",,..ᅩ!'.split(''), new Map([['ᄀᄀ', 'ᄁ'], ['ᄃᄃ', 'ᄄ'], ['ᄇᄇ', 'ᄈ'], ['ᄉᄉ', 'ᄊ'], ['ᄌᄌ', 'ᄍ'], ['ᅩᅡ', 'ᅪ'], ['ᅩᅢ', 'ᅫ'], ['ᅩᅵ', 'ᅬ'], ['ᅮᅥ', 'ᅯ'], ['ᅮᅦ', 'ᅰ'], ['ᅮᅵ', 'ᅱ'], ['ᆨᆨ', 'ᆩ'], ['ᆨᆺ', 'ᆪ'], ['ᆫᆽ', 'ᆬ'], ['ᆫᇂ', 'ᆭ'], ['ᆯᆨ', 'ᆰ'], ['ᆯᆷ', 'ᆱ'], ['ᆯᆸ', 'ᆲ'], ['ᆯᆺ', 'ᆳ'], ['ᆯᇀ', 'ᆴ'], ['ᆯᇁ', 'ᆵ'], ['ᆯᇂ', 'ᆶ'], ['ᆸᆺ', 'ᆹ'], ['ᆺᆺ', 'ᆻ']])),
        SEBEOL_FINAL_STRICT: new Hangul3Keyboard('세벌식 최종 (정석)', ' *※ᇂᆩᆻᆰᆸᆽᅭᆵᅲᆴᅣ=ᅨ“ᅴ”ᅮ\'ᄏ~);>+:\\ᆺᇁᆯᇀᅧᆬᅢᆶᅥᆳᄅ5ᄃ6ᄆ7ᄎ8ᄑ9(%</ᆼᆮᆫᆭᅵᆲᅡᆱᅳᅤᄂ0ᄋ1ᄀ2ᄌ3ᄇ4ᄐ·ᆷᆾᆨᆹᅦᆿᅩᆪᅮ?ᄉ-ᄒ",,..ᅩ!'.split(''), new Map([['ᄀᄀ', 'ᄁ'], ['ᄃᄃ', 'ᄄ'], ['ᄇᄇ', 'ᄈ'], ['ᄉᄉ', 'ᄊ'], ['ᄌᄌ', 'ᄍ'], ['ᅩᅡ', 'ᅪ'], ['ᅩᅢ', 'ᅫ'], ['ᅩᅵ', 'ᅬ'], ['ᅮᅥ', 'ᅯ'], ['ᅮᅦ', 'ᅰ'], ['ᅮᅵ', 'ᅱ']])),
    }
    static DEFAULT_ENKO = new Mfsjea([Mfsjea.LAYOUTS.QWERTY, Mfsjea.LAYOUTS.DVORAK, Mfsjea.LAYOUTS.COLEMAK], [Mfsjea.LAYOUTS.DUBEOL_STANDARD, Mfsjea.LAYOUTS.SEBEOL_390, Mfsjea.LAYOUTS.SEBEOL_FINAL], [new NonHangulPenaltyScorer(5), new Hangul2350Scorer(10), new HangulSyllableFrequencyScorer(1)])
    inputKeyboards: Keyboard[]
    outputKeyboards: Keyboard[]
    scorers: Scorer[]
    constructor(inputKeyboards: Keyboard[], outputKeyboards: Keyboard[], scorers: Scorer[]) {
        this.inputKeyboards = inputKeyboards
        this.outputKeyboards = outputKeyboards
        this.scorers = scorers
    }
    score(result: ConvertResult): number {
        return this.scorers.map(scorer => scorer.calculateScore(result.output) * scorer.weight).reduce((a, c) => a + c) / this.scorers.map(scorer => scorer.weight).reduce((a, c) => a + c)
    }
    convertAll(input: string): ConvertResult[] {
        return this.outputKeyboards.map(outputKeyboard => this.inputKeyboards.map(inputKeyboard => Mfsjea.convert(input, inputKeyboard, outputKeyboard))).flat()
    }
    scoreAll(results: ConvertResult[]): ConvertResult[] {
        return results.map(result => result.applyScore(this.score(result)))
    }
    convertBest(input: string): ConvertResult {
        return this.scoreAll(this.convertAll(input)).sort((a, b) => b.score - a.score)[0]
    }
    static convert(input: string, inputKeyboard: Keyboard, outputKeyboard: Keyboard): ConvertResult {
        const result = outputKeyboard.convertTo(inputKeyboard.convertFrom(input))
        return new ConvertResult(input, result, null, inputKeyboard.name, outputKeyboard.name)
    }
}

export default Mfsjea
