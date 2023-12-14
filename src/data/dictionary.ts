
import * as enData from './en.json'
import * as koData from './ko.json'

export const dictionaries: Record<string, Set<string>> = {
    'en': new Set(enData),
    'ko': new Set(koData),
}
