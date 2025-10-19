import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ILike } from 'typeorm'
import { Budget } from './budgets.entity'
import { CreateBudgetDto } from './dto/create-budget.dto'
import { UpdateBudgetDto } from './dto/update-budget.dto'
import { QueryBudgetDto } from './dto/query-budget.dto'
import { buildPagination } from '../common/utils/pagination'

@Injectable()
export class BudgetsService {
  constructor(@InjectRepository(Budget) private repo: Repository<Budget>) {}

  async create(dto: CreateBudgetDto) {
    const total = dto.items.reduce((acc, it) => acc + it.qty * it.unitPrice, 0)
    const budget = this.repo.create({ ...dto, total: total.toFixed(2) })
    return this.repo.save(budget)
  }

  async findAll(q: QueryBudgetDto) {
    const { status, search, page, limit } = q
    const { skip, take } = buildPagination(page, limit)
    const where: any = {}
    if (status) where.status = status
    if (search) {
      where.clientName = ILike(`%${search}%`)
    }
    const [data, count] = await this.repo.findAndCount({ where, skip, take, order: { createdAt: 'DESC' } })
    return { data, page, limit, count }
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } })
    if (!found) throw new NotFoundException('Budget not found')
    return found
  }

  async update(id: string, dto: UpdateBudgetDto) {
    await this.findOne(id)
    await this.repo.update(id, dto as any)
    return this.findOne(id)
  }

  async updateStatus(id: string, status: Budget['status']) {
    await this.findOne(id)
    await this.repo.update(id, { status })
    return this.findOne(id)
  }

  async remove(id: string) {
    await this.findOne(id)
    await this.repo.delete(id)
    return { id }
  }
}
