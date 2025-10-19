// src/db/seed/seed.ts
import 'reflect-metadata'
import 'dotenv/config'
import { DataSource } from 'typeorm'
import ds from '../../../ormconfig'
import { Budget } from '../../budgets/budgets.entity'
import { InfoRequest } from '../../info-requests/info-request.entity'

async function run() {
  const dataSource = await (ds as DataSource).initialize()

  const budRepo = dataSource.getRepository(Budget)
  const irRepo = dataSource.getRepository(InfoRequest)

  await budRepo.save(budRepo.create({
    clientName: 'Cliente Demo',
    clientEmail: 'cliente@demo.com',
    items: [{ sku: 'ABC', qty: 2, unitPrice: 100 }],
    total: '200.00',
    status: 'draft',
  }))

  await irRepo.save(irRepo.create({
    requester: 'Vendedor X',
    contactEmail: 'vendx@demo.com',
    type: 'stock',
    payload: { sku: 'ABC' },
    status: 'open',
  }))

  await dataSource.destroy()
  console.log('✅ Seed OK')
}
run().catch((e) => { console.error(e); process.exit(1) })
