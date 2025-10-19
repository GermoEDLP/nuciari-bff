import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { InfoRequestsService } from './info-requests.service'
import { CreateInfoRequestDto } from './dto/create-info-request.dto'
import { QueryInfoRequestDto } from './dto/query-info-request.dto'

@ApiTags('info-requests')
@Controller({ path: 'info-requests', version: '1' })
export class InfoRequestsController {
  constructor(private readonly service: InfoRequestsService) {}

  @Post() create(@Body() dto: CreateInfoRequestDto) { return this.service.create(dto) }
  @Get() findAll(@Query() q: QueryInfoRequestDto) { return this.service.findAll(q) }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id) }
  @Patch(':id/status/:status') status(@Param('id') id: string, @Param('status') status: any) {
    return this.service.updateStatus(id, status)
  }
}
