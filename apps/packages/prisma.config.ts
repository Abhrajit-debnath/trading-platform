import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'


export default defineConfig({
  schema: './shared/src/database/prisma/schema.prisma',
  datasource: {
    url: env('DIRECT_URL'),
  },
})
