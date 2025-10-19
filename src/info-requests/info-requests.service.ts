import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ILike } from 'typeorm'
import { InfoRequest } from './info-request.entity'
import { CreateInfoRequestDto } from './dto/create-info-request.dto'
import { QueryInfoRequestDto } from './dto/query-info-request.dto'
import { buildPagination } from '../common/utils/pagination'

@Injectable()
export class InfoRequestsService {
  constructor(@InjectRepository(InfoRequest) private repo: Repository<InfoRequest>) {}

  create(dto: CreateInfoRequestDto) {
    return this.repo.save(this.repo.create(dto))
  }

  async findAll(q: QueryInfoRequestDto) {
    const { page, limit, type, status, search } = q
    const { skip, take } = buildPagination(page, limit)
    const where: any = {}
    if (type) where.type = type
    if (status) where.status = status
    if (search) where.requester = ILike(`%${search}%`)
    const [data, count] = await this.repo.findAndCount({ where, skip, take, order: { createdAt: 'DESC' } })
    return { data, page, limit, count }
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } })
    if (!found) throw new NotFoundException('InfoRequest not found')
    return found
  }

  async updateStatus(id: string, status: InfoRequest['status']) {
    await this.findOne(id)
    await this.repo.update(id, { status })
    return this.findOne(id)
  }
}
