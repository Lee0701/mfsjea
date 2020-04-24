const COMPAT_CHO = 'ㄱㄲㄳㄴㄵㄶㄷㄸㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅃㅄㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'
const COMPAT_JUNG = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'
const CONVERT_CHO = 'ᄀᄁ\0ᄂ\0\0ᄃᄄᄅ\0\0\0\0\0\0\0ᄆᄇᄈ\0ᄉᄊᄋᄌᄍᄎᄏᄐᄑᄒ'
const CONVERT_JUNG = 'ᅡᅢᅣᅤᅥᅦᅧᅨᅩᅪᅫᅬᅭᅮᅯᅰᅱᅲᅳᅴᅵ'
const CONVERT_JONG = 'ᆨᆩᆪᆫᆬᆭᆮ\0ᆯᆰᆱᆲᆳᆴᆵᆶᆷᆸ\0ᆹᆺᆻᆼᆽ\0ᆾᆿᇀᇁᇂ'
const COMPAT_JAMO = COMPAT_CHO + COMPAT_JUNG + COMPAT_CHO
const STANDARD_JAMO = CONVERT_CHO + CONVERT_JUNG + CONVERT_JONG

function compatJamoToStandardJamoInSyllable(input: string): string {
    const convertCho = (c: string) => c.split('').map(d => CONVERT_CHO[COMPAT_CHO.indexOf(d)]).join('')
    const convertJung = (c: string) => c.split('').map(d => CONVERT_JUNG[COMPAT_JUNG.indexOf(d)]).join('')
    const convertJong = (c) => c ? c.split('').map(d => CONVERT_JONG[COMPAT_CHO.indexOf(d)]).join('') : ''
    return input.replace(/([ㄱ-ㅎ])([ㅏ-ㅣ][ㅏ-ㅣ]?)([ㄱ-ㅎ]?[ㄱ-ㅎ]?)(?![ㅏ-ㅣ])/g, (_, cho, jung, jong) =>
            convertCho(cho) + convertJung(jung) + convertJong(jong))
}
function compatJamoToStandardJamo(input: string): string {
    return input.split('').map(c => STANDARD_JAMO[COMPAT_JAMO.indexOf(c)] || c).join('')
}
function standardJamoToCompatJamo(input: string): string {
    return input.split('').map(c => COMPAT_JAMO[STANDARD_JAMO.indexOf(c)] || c).join('')
}

export {compatJamoToStandardJamo, standardJamoToCompatJamo, compatJamoToStandardJamoInSyllable, COMPAT_CHO, COMPAT_JUNG, CONVERT_CHO, CONVERT_JUNG, CONVERT_JONG, COMPAT_JAMO, STANDARD_JAMO}
