
export const COMPAT_CHO = 'ㄱㄲㄳㄴㄵㄶㄷㄸㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅃㅄㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'
export const COMPAT_JUNG = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'

export const CONVERT_CHO = 'ᄀᄁ\0ᄂ\0\0ᄃᄄᄅ\0\0\0\0\0\0\0ᄆᄇᄈ\0ᄉᄊᄋᄌᄍᄎᄏᄐᄑᄒ'
export const CONVERT_JUNG = 'ᅡᅢᅣᅤᅥᅦᅧᅨᅩᅪᅫᅬᅭᅮᅯᅰᅱᅲᅳᅴᅵ'
export const CONVERT_JONG = 'ᆨᆩᆪᆫᆬᆭᆮ\0ᆯᆰᆱᆲᆳᆴᆵᆶᆷᆸ\0ᆹᆺᆻᆼᆽ\0ᆾᆿᇀᇁᇂ'

export function isSyllable(c: string): boolean {
    return c.charCodeAt(0) >= 0xAC00 && c.charCodeAt(0) <= 0xD7A3
}

export function isCho(c: string): boolean {
    return CONVERT_CHO.includes(c)
}

export function isJung(c: string): boolean {
    return CONVERT_JUNG.includes(c)
}

export function isJong(c: string): boolean {
    return CONVERT_JONG.includes(c)
}

export function isCompatCho(c: string): boolean {
    return COMPAT_CHO.includes(c)
}

export function isCompatJung(c: string): boolean {
    return COMPAT_JUNG.includes(c)
}

export function isCompatJong(c: string): boolean {
    return COMPAT_CHO.includes(c)
}

export function toCho(c: string): string {
    return CONVERT_CHO[COMPAT_CHO.indexOf(c)]
}

export function toJung(c: string): string {
    return CONVERT_JUNG[COMPAT_JUNG.indexOf(c)]
}

export function toJong(c: string): string {
    return CONVERT_JONG[COMPAT_CHO.indexOf(c)]
}

export function toCompatCho(c: string): string {
    if(CONVERT_CHO.includes(c)) return COMPAT_CHO[CONVERT_CHO.indexOf(c)]
    if(CONVERT_JONG.includes(c)) return COMPAT_CHO[CONVERT_JONG.indexOf(c)]
    return c
}

export function toCompatJung(c: string): string {
    return COMPAT_JUNG[CONVERT_JUNG.indexOf(c)]
}

export function elevateCho(c: string): string {
    return CONVERT_CHO[CONVERT_JONG.indexOf(c)]
}
