import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: './shared/src/database/prisma/schema.prisma',
  datasource: {
    url: env('DIRECT_URL'),
  },
})