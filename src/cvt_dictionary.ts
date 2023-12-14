
import * as fs from 'fs/promises'

export async function convert(name: string, source: string): Promise<void> {
    const content = await fs.readFile(source, 'utf-8')
    const lines = content.split('\n').filter((line) => line.trim().length)
    await fs.mkdir('src/data', { recursive: true })
    await fs.writeFile(`src/data/${name}.json`, JSON.stringify(lines))
}

const sourceFiles = {
    'en': 'data/google-10000-english.txt',
    'ko': 'data/ko_10k.txt',
}

Object.entries(sourceFiles).forEach(([name, file]) => convert(name, file))
