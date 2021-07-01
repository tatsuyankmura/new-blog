import * as path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'
import { createCanvas, registerFont, loadImage } from 'canvas'
import { API_PATH } from '../../../../config/constants'

type SeparatedText = {
  line: string
  remaining: string
}

function createTextLine(context, text: string): SeparatedText {
  const maxWidth = 400

  for (let i = 0; i < text.length; i++) {
    const line = text.substring(0, i + 1)
    if (context.measureText(line).width > maxWidth) {
      return {
        line,
        remaining: text.substring(i + 1),
      }
    }
  }

  return {
    line: text,
    remaining: '',
  }
}

function createTextLines(context, text: string): string[] {
  const lines: string[] = []
  let currentText = text

  while (currentText !== '') {
    const separatedText = createTextLine(context, currentText)
    lines.push(separatedText.line)
    currentText = separatedText.remaining
  }

  return lines
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const width = 600
  const height = 315
  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')
  const id = req.query.id

  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  }

  const data = await fetch(`${API_PATH}/${id}`, key)
    .then((res) => res.json())
    .catch(() => null)

  const image = await loadImage(path.resolve('./ogp/images/ogp_bg.png'))
  context.drawImage(image, 0, 0, width, height)

  registerFont(path.resolve('./ogp/fonts/NotoSansJP-Medium.otf'), {
    family: 'Noto',
  })

  context.font = '32px Noto'
  context.fillStyle = '#666'
  context.textAlign = 'center'
  context.textBaseline = 'middle'

  const lines = createTextLines(context, data.title)
  lines.forEach((line, index) => {
    const y = 157 + 40 * (index - (lines.length - 1) / 2)
    context.fillText(line, 300, y)
  })

  const buffer = canvas.toBuffer()

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length,
  })
  res.end(buffer, 'binary')
}
