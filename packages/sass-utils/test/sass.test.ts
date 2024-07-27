import path from 'node:path'
import sassTrue from 'sass-true'
import { describe, it } from 'vitest'

const sassFile = path.join(__dirname, 'index.test.scss')
sassTrue.runSass({ describe, it }, sassFile)
