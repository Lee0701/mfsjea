
/**
 * Consonants, as in Hangul Compatibility Jamo.
 */
export const COMPAT_CHO = 'ㄱㄲㄳㄴㄵㄶㄷㄸㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅃㅄㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'

/**
 * Vowels, as in Hangul Compatibility Jamo.
 */
export const COMPAT_JUNG = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'

/**
 * Initial consonants, as in Hangul Jamo.
 */
export const CONVERT_CHO = 'ᄀᄁ\0ᄂ\0\0ᄃᄄᄅ\0\0\0\0\0\0\0ᄆᄇᄈ\0ᄉᄊᄋᄌᄍᄎᄏᄐᄑᄒ'

/**
 * Vowels, as in Hangul Jamo.
 */
export const CONVERT_JUNG = 'ᅡᅢᅣᅤᅥᅦᅧᅨᅩᅪᅫᅬᅭᅮᅯᅰᅱᅲᅳᅴᅵ'

/**
 * Final consonants, as in Hangul Jamo.
 */
export const CONVERT_JONG = 'ᆨᆩᆪᆫᆬᆭᆮ\0ᆯᆰᆱᆲᆳᆴᆵᆶᆷᆸ\0ᆹᆺᆻᆼᆽ\0ᆾᆿᇀᇁᇂ'

/**
 * Checks whether a character is a Hangul Syllable.
 * @param c an input character.
 * @returns if the input character belongs to the Hangul Syllables.
 */
export function isSyllable(c: string): boolean {
    return c.charCodeAt(0) >= 0xAC00 && c.charCodeAt(0) <= 0xD7A3
}

/**
 * Checks whether a character is a initial consonant in Hangul Jamo.
 */
export function isCho(c: string): boolean {
    return CONVERT_CHO.includes(c)
}

/**
 * Checks whether a character is a vowel in Hangul Jamo.
 */
export function isJung(c: string): boolean {
    return CONVERT_JUNG.includes(c)
}

/**
 * Checks whether a character is a final consonant in Hangul Jamo.
 */
export function isJong(c: string): boolean {
    return CONVERT_JONG.includes(c)
}

/**
 * Checks whether a character is a consonant in Hangul Compatibility Jamo.
 */
export function isCompatCho(c: string): boolean {
    return COMPAT_CHO.includes(c)
}

/**
 * Checks whether a character is a vowel in Hangul Compatibility Jamo.
 */
export function isCompatJung(c: string): boolean {
    return COMPAT_JUNG.includes(c)
}

/**
 * Checks whether a character is a final consonant in Hangul Compatibility Jamo.
 * Actually does the same thing as isCompatCho.
 */
export function isCompatJong(c: string): boolean {
    return COMPAT_CHO.includes(c)
}

/**
 * Converts a Hangul consonant to a initial consonant as in Hangul Jamo.
 */
export function toCho(c: string): string {
    return CONVERT_CHO[COMPAT_CHO.indexOf(c)]
}

/**
 * Converts a Hangul vowel to a vowel as in Hangul Jamo.
 */
export function toJung(c: string): string {
    return CONVERT_JUNG[COMPAT_JUNG.indexOf(c)]
}

/**
 * Converts a Hangul consonant to a final consonant as in Hangul Jamo.
 */
export function toJong(c: string): string {
    return CONVERT_JONG[COMPAT_CHO.indexOf(c)]
}

/**
 * Converts a Hangul consonant in Hangul Jamo, into a consonant in Hangul Compatibility Jamo.
 */
export function toCompatCho(c: string): string {
    if(CONVERT_CHO.includes(c)) return COMPAT_CHO[CONVERT_CHO.indexOf(c)]
    if(CONVERT_JONG.includes(c)) return COMPAT_CHO[CONVERT_JONG.indexOf(c)]
    return c
}

/**
 * Converts a Hangul vowel in Hangul Jamo, into a vowel in Hangul Compatibility Jamo.
 */
export function toCompatJung(c: string): string {
    return COMPAT_JUNG[CONVERT_JUNG.indexOf(c)]
}

/**
 * Converts a Hangul final consonant into a initial consonant.
 * Also known as 'ghost light'
 */
export function elevateCho(c: string): string {
    return CONVERT_CHO[CONVERT_JONG.indexOf(c)]
}
