// ormconfig.ts
import 'dotenv/config'
import { DataSource } from 'typeorm'

// Detecta si estamos ejecutando con ts-node
const isTsNode = !!process.argv.find((a) => a.includes('ts-node'))

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  // Cuando es ts-node, usamos los .ts de src; si no, los .js de dist
  entities: [isTsNode ? 'src/**/*.entity.ts' : 'dist/**/*.entity.js'],
  migrations: [isTsNode ? 'src/db/migrations/*.ts' : 'dist/src/db/migrations/*.js'],
})
